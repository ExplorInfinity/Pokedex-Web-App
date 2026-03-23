import { PokemonAPI, getPokemon } from './api.js'
import { updateSearchList } from './searchList.js'

const debouncingTime = 600;
const searchBar = document.getElementById('searchBarInput');

function getSearchMatches(input) {
    input = input.trim().toLowerCase();
    return PokemonAPI.cache.nameList.filter(pokemon => pokemon.startsWith(input));
}

let searchTimer = null;
searchBar.addEventListener('input', () => {
    clearTimeout(searchTimer);

    searchTimer = setTimeout(async () => {
        if(searchBar.value.trim()) {
            const matches = getSearchMatches(searchBar.value);
            updateSearchList(matches);
        }
    }, debouncingTime);
});