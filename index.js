import './src/search.js'
import { preloadData } from './src/api.js'
import {updatePokemonProfile} from "./src/components/pokemonProfile.js";
import {search} from "./src/search.js";

window.addEventListener('DOMContentLoaded', async () => {
    await preloadData();
    updatePokemonProfile(await search("squirtle"));
});