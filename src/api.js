import fetchURL from './fetch.js';
import {formatString, getLocalStorage} from "./utils.js";
import Pokemon from "./pokemon.js";
import pokemon from "./pokemon.js";

class PokemonAPI {

    static apiUrl = "https://pokeapi.co/api/v2/";
    static apiEndPoints = {
        GET_POKEMON: 'pokemon/',
        GET_POKEMON_SPECIES: 'pokemon-species/'
    };


    static cache = new Map();

    static async getAllPokemonCount() {
        return (await fetchURL("https://pokeapi.co/api/v2/pokemon-species/")).count;
    }

    static async getAllPokemonNames() {
        return (await fetchURL("https://pokeapi.co/api/v2/pokemon-species?limit=100000")).results;
    }

    static async getPokemonDetailsByID(pokemonID) {
        return await this.getPokemonDetails(PokemonAPI.pokemonList[pokemonID - 1].value);
    }

    static async getPokemonDetails(pokemonName) {
        if (PokemonAPI.cache.has(pokemonName))
            return PokemonAPI.cache.get(pokemonName);

        const pokemonDetails = await fetchURL(PokemonAPI.apiUrl + PokemonAPI.apiEndPoints.GET_POKEMON + pokemonName);
        const speciesDetails = await fetchURL(PokemonAPI.apiUrl + PokemonAPI.apiEndPoints.GET_POKEMON_SPECIES + pokemonDetails.species.name);
        speciesDetails.evolution_chain = await fetchURL(speciesDetails.evolution_chain.url);

        const pokemon = Pokemon.createPokemonInstance({ ...speciesDetails, ...pokemonDetails });
        PokemonAPI.cache.set(pokemonName, pokemon);
        console.log({ ...speciesDetails, ...pokemonDetails });
        return pokemon;
    }

    static getRandomPokemon() {
        return PokemonAPI.pokemonList[Math.floor(Math.random() * PokemonAPI.pokemonList.length)];
    }
}

async function preloadData() {
    const local = getLocalStorage('pokemonList');
    if (local && local.length === await PokemonAPI.getAllPokemonCount()) {
        PokemonAPI.pokemonList = local;
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