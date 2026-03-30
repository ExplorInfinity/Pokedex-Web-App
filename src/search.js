import { PokemonAPI } from './api.js'
import { updateSearchList, updateCurrentInputPreview, hideSuggestionsList, showSuggestionsList } from './suggestionList.js'
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

window.addEventListener('click', e => {
    if (!searchBarContainer.contains(e.target)) {
        searchBar.blur();
        hideSuggestionsList();
    }
});

window.addEventListener('keydown', e => {
    if (e.metaKey && e.code === 'KeyK') {
        e.preventDefault();
        searchBar.focus();
    }

    if (e.code === 'Escape' && document.activeElement === searchBar) {
        searchBar.blur();
    }
});

export { getSearchMatches, handleSearchBarInput, search };