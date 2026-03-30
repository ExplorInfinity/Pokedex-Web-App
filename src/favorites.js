import { createCard } from "./components/pokemonCard.js";
import { PokemonAPI } from "./api.js";
import { getLocalStorage, setLocalStorage } from "./utils.js";

const favoritesWrapper = document.getElementById('favoritesContainer');
const favoritesContainer = document.getElementById('favorites');

const favorites = getLocalStorage("favorites") ?? [];
const favoritesSet = new Set(favorites);

async function showFavorites() {
    if (favorites.size === 0) {
        favoritesWrapper.style.display = "none";
        return;
    }

    favoritesWrapper.style.display = "flex";
    favoritesContainer.innerHTML = '';
    for (const favorite of favorites) {
        const card = createCard(await PokemonAPI.getPokemonDetailsByID(favorite));
        favoritesContainer.append(card);
    }
}

function setFavorite(pokemon) {
    favorites.push(pokemon.id);
    favoritesSet.add(pokemon.id);
    setLocalStorage("favorites", favorites);
}

function deleteFavorite(pokemon) {
    favorites.splice(favorites.indexOf(pokemon.id), 1);
    favoritesSet.delete(pokemon.id);
    setLocalStorage("favorites", favorites);
}

function hasFavorite(pokemon) {
    return favoritesSet.has(pokemon.id);
}

function toggleFavorite(pokemon) {
    if (hasFavorite(pokemon)) {
        deleteFavorite(pokemon);
        return false;
    }

    setFavorite(pokemon);
    return true;
}

export { showFavorites, setFavorite, deleteFavorite, hasFavorite, toggleFavorite };