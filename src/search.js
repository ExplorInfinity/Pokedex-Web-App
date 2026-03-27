import {PokemonAPI} from './api.js'
import {updateSearchList, updateCurrentInputPreview} from './searchList.js'

const debouncingTime = 300;
const searchBar = document.getElementById('searchBarInput');

async function search(input) {
    input = input.toLowerCase().trim();
    const pokemon = PokemonAPI.pokemonList.find(pokemon => input === pokemon.lowerCaseName);
    if (!pokemon) {
        alert("No Pokemon found.");
        return;
    }

    return await PokemonAPI.getPokemonDetails(pokemon.value);
}

function handleSearchBarInput() {
    if(searchBar.value.trim().length === 0) {
        updateSearchList([]);
        return;
    }
    const matches = getSearchMatches(searchBar.value);
    updateSearchList(matches, searchBar.value.trim());
}

function getSearchMatches(input) {
    input = input.trim().toLowerCase();
    return PokemonAPI.pokemonList.filter(pokemon => pokemon.lowerCaseName.startsWith(input));
}

let searchTimer = null;
searchBar.addEventListener('input', () => {
    clearTimeout(searchTimer);
    updateCurrentInputPreview(searchBar.value.trim());
    searchTimer = setTimeout(handleSearchBarInput, debouncingTime);
});

export { getSearchMatches, handleSearchBarInput, search };