import fetchURL from './fetch.js';

const apiUrl = "https://pokeapi.co/api/v2";
const apiEndPoints = {
    GET_POKEMON: '/pokemon/'
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
    const data = await fetchURL(apiUrl + apiEndPoints.GET_POKEMON + pokemonName);

    if (data)
        return data;
}

async function preloadData() {
    PokemonAPI.cache.pokemonList = await getAllPokemonNames();
    PokemonAPI.cache.nameList = PokemonAPI.cache.pokemonList.map(pokemon => pokemon.name);
    PokemonAPI.cache.nameList.sort();
    console.log(PokemonAPI.cache.pokemonList);
}

export { PokemonAPI, getPokemon, getAllPokemonNames, preloadData };