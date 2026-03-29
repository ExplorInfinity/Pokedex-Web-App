import fetchURL from './fetch.js';
import { formatString } from "./utils.js";
import Pokemon from "./pokemon.js";

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

    static async getPokemonDetailsByID(pokemonID) {
        return await this.getPokemonDetails(PokemonAPI.pokemonList[pokemonID-1].value);
    }

    static async getPokemonDetails(pokemonName) {
        if (PokemonAPI.cache.has(pokemonName))
            return PokemonAPI.cache.get(pokemonName);

        const pokemonDetails = await fetchURL(PokemonAPI.apiUrl + PokemonAPI.apiEndPoints.GET_POKEMON + pokemonName);
        const speciesDetails = await fetchURL(PokemonAPI.apiUrl + PokemonAPI.apiEndPoints.GET_POKEMON_SPECIES + pokemonDetails.species.name);
        speciesDetails.evolution_chain = await fetchURL(speciesDetails.evolution_chain.url);

        const pokemon = Pokemon.createPokemonInstance({ ...speciesDetails, ...pokemonDetails });
        PokemonAPI.cache.set(pokemonName, pokemon);
        return pokemon;
    }
}

async function preloadData() {
    if (localStorage.getItem('pokemonList')) {
        PokemonAPI.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        return;
    }

    PokemonAPI.pokemonList = await PokemonAPI.getAllPokemonNames();
    PokemonAPI.pokemonList.forEach(pokemon => {
        pokemon.value = pokemon.name;
        pokemon.name = formatString(pokemon.name);
        pokemon.lowerCaseName = pokemon.name.toLowerCase();
    });

    localStorage.setItem('pokemonList', JSON.stringify(PokemonAPI.pokemonList));
}

export { PokemonAPI, preloadData };