import fetchURL from './fetch.js';
import {formatString} from "./utils.js";

class Pokemon {
    static createPokemonInstance(pokemonDetails) {
        const pokemon = new Pokemon();
        pokemon.id = pokemonDetails.id;
        pokemon.name = formatString(pokemonDetails.name);
        pokemon.lowerCaseName = pokemon.name.toLowerCase();
        pokemon.baseExp = pokemonDetails.base_experience;
        pokemon.height = pokemonDetails.height;
        pokemon.weight = pokemonDetails.weight;
        pokemon.ability = formatString(pokemonDetails.abilities.length ? pokemonDetails.abilities[0].ability.name : "None");
        pokemon.types = pokemonDetails.types.map(t => t.type.name);
        pokemon.image = pokemonDetails.sprites.other["official-artwork"].front_default;
        pokemon.descriptions = pokemonDetails.flavor_text_entries.filter(e => e.language.name === "en").map(e => e.flavor_text);
        pokemon.category = pokemonDetails.genera.find(g => g.language.name === "en").genus;

        pokemon.stats = {};
        pokemonDetails.stats.forEach(s => pokemon.stats[s.stat.name] = s.base_stat );

        return pokemon;
    }

    getDescription() {
        return this.descriptions[Math.floor(Math.random() * this.descriptions.length)]
            .replace(/\f/g, " ")
            .replace(/\n/g, " ");
    }
}

class PokemonAPI {

    static apiUrl = "https://pokeapi.co/api/v2/";
    static apiEndPoints = {
        GET_POKEMON: 'pokemon/',
        GET_POKEMON_SPECIES: 'pokemon-species/'
    };

    static cache = new Map();

    static async getAllPokemonNames() {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000");
        const data = await res.json();
        return data.results;
    }

    static async getPokemonDetails(pokemonName) {
        if (PokemonAPI.cache.has(pokemonName))
            return PokemonAPI.cache.get(pokemonName);

        const pokemonDetails = await fetchURL(PokemonAPI.apiUrl + PokemonAPI.apiEndPoints.GET_POKEMON + pokemonName);
        const speciesDetails = await fetchURL(PokemonAPI.apiUrl + PokemonAPI.apiEndPoints.GET_POKEMON_SPECIES + pokemonDetails.species.name);

        const pokemon = Pokemon.createPokemonInstance({ ...pokemonDetails, ...speciesDetails });
        PokemonAPI.cache.set(pokemonName, pokemon);
        return pokemon;
    }
}

async function preloadData() {
    PokemonAPI.pokemonList = await PokemonAPI.getAllPokemonNames();
    PokemonAPI.pokemonList.sort((p1, p2) => p1.name < p2.name ? -1 : 1);
    PokemonAPI.pokemonList.forEach(pokemon => {
        pokemon.value = pokemon.name;
        pokemon.name = formatString(pokemon.name);
        pokemon.lowerCaseName = pokemon.name.toLowerCase();
    });

    console.log(PokemonAPI.pokemonList);
}

export { PokemonAPI, preloadData };