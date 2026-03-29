import { createCard } from "./components/pokemonCard.js";
import { PokemonAPI } from "./api.js";
import { createUrlString } from "./utils.js";

const favoritesWrapper = document.getElementById('favoritesContainer');
const favoritesContainer = document.getElementById('favorites');

const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
async function showFavorites() {
    if (favorites.length === 0) {
        favoritesWrapper.style.display = "none";
        return;
    }

    favoritesContainer.innerHTML = '';
    for (let i = 0; i < favorites.length; i++) {
        const card = createCard(await PokemonAPI.getPokemonDetailsByID(favorites[i]));
        favoritesContainer.append(card);
    }
}

function setFavorite(pokemon) {
    if (favorites.find(f => f === pokemon.id)) {
        return;
    }

    favorites.push(pokemon.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export { showFavorites, setFavorite };