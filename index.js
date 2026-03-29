import { preloadData } from './src/api.js'
import { search } from "./src/search.js";
import { updatePokemonProfile } from "./src/components/pokemonProfile.js";
import { showFavorites } from "./src/favorites.js";

window.addEventListener('DOMContentLoaded', async () => {
    await preloadData();
    updatePokemonProfile(await search("squirtle"));
    await showFavorites();
});