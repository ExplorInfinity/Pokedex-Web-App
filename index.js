import {PokemonAPI, preloadData} from './src/api.js'
import { search } from "./src/search.js";
import { updatePokemonProfile } from "./src/components/pokemonProfile.js";
import { showFavorites } from "./src/favorites.js";

window.addEventListener('DOMContentLoaded', async () => {
    await preloadData();
    updatePokemonProfile(await search(PokemonAPI.getRandomPokemon().lowerCaseName));
    await showFavorites();
});