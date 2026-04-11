import { PokemonAPI } from "./api.js";
import { currentPokemon, updatePokemonProfile } from "./components/pokemonProfile.js";

const prev = document.getElementById('prev');
const next = document.getElementById('next');

prev.addEventListener('click', async () => {
    if (!currentPokemon) return;
    const totalPokemons = PokemonAPI.pokemonList.length;
    const pokemon = await PokemonAPI.getPokemonDetailsByID((currentPokemon.id - 2 + totalPokemons) % totalPokemons + 1);
    updatePokemonProfile(pokemon);
});

next.addEventListener('click', async () => {
    if (!currentPokemon) return;
    const totalPokemons = PokemonAPI.pokemonList.length;
    const pokemon = await PokemonAPI.getPokemonDetailsByID(currentPokemon.id % totalPokemons + 1);
    updatePokemonProfile(pokemon);
});