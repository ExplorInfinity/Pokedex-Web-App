import { PokemonAPI } from './api.js'
import { updateSearchList, updateCurrentInputPreview, hideSuggestionsList, showSuggestionsList } from './searchList.js'
import { isIntegerString } from "./utils.js";

const debouncingTime = 300;
const searchBar = document.getElementById('searchBarInput');
const searchBarContainer = document.querySelector('.searchBar');

async function search(input) {
    input = input.toLowerCase().trim();

    // ID Check
    if (isIntegerString(input) && Number(input) > 0 && Number(input) <= PokemonAPI.pokemonList.length ) {
        return await PokemonAPI.getPokemonDetailsByID(Number(input));
    }

    // Name Check
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

searchBar.addEventListener('focusin', showSuggestionsList);
searchBar.addEventListener('focusout', (e) => {
    if(!searchBarContainer.contains(document.activeElement)) hideSuggestionsList();
});

export { getSearchMatches, handleSearchBarInput, search };