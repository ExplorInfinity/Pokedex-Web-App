import {getPokemon, PokemonAPI} from './api.js'
import {updateSearchList, updateCurrentInputPreview} from './searchList.js'

const debouncingTime = 500;
const searchBar = document.getElementById('searchBarInput');

async function search(input) {
    if (!PokemonAPI.cache.nameList.find(name => input === name)) {
        alert("No Pokemon found.");
        return;
    }

    return await getPokemon(input);
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
    return PokemonAPI.cache.nameList.filter(pokemon => pokemon.startsWith(input));
}

let searchTimer = null;
searchBar.addEventListener('input', () => {
    clearTimeout(searchTimer);
    updateCurrentInputPreview(searchBar.value.trim());
    searchTimer = setTimeout(handleSearchBarInput, debouncingTime);
});

export { getSearchMatches, handleSearchBarInput, search };