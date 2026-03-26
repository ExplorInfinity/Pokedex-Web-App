import fetchURL from './fetch.js';
import {formatString} from "./utils.js";

const apiUrl = "https://pokeapi.co/api/v2";
const apiEndPoints = {
    GET_POKEMON: '/pokemon/',
    GET_POKEMON_SPECIES: '/pokemon-species/'
};

const PokemonAPI = {
    cache: {}
};

async function getAllPokemonNames() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000");
    const data = await res.json();
    return data.results;
}

async function getPokemon(pokemonName) {
    return await fetchURL(apiUrl + apiEndPoints.GET_POKEMON + pokemonName);
}

async function preloadData() {
    PokemonAPI.cache.pokemonList = await getAllPokemonNames();
    PokemonAPI.cache.pokemonList.sort((p1, p2) => p1.name < p2.name ? -1 : 1);
    PokemonAPI.cache.pokemonList.forEach(pokemon => {
        pokemon.value = pokemon.name;
        pokemon.name = formatString(pokemon.name);
        pokemon.lowerCaseName = pokemon.name.toLowerCase();
    });

    console.log(PokemonAPI.cache.pokemonList);
}

export { PokemonAPI, getPokemon, getAllPokemonNames, preloadData };