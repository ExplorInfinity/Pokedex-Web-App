import { updatePokemonProfile } from "./pokemonProfile.js";
import { PokemonAPI } from "../api.js";

const pokemonContainer = document.getElementById('pokemonContainer');

function createImageTag(url) {
    const image = document.createElement("img");
    image.src = url;
    return image;
}

function showAllImages(card, pokemon) {
    const { front_default, back_default, front_shiny, back_shiny } = pokemon.sprites;
    card.appendChild(createImageTag(front_default));
    card.appendChild(createImageTag(back_default));
    card.appendChild(createImageTag(front_shiny));
    card.appendChild(createImageTag(back_shiny));
    for (const item in pokemon.sprites.other) {
        const h1 = document.createElement('h1');
        h1.textContent = item;
        card.appendChild(h1);
        card.appendChild(createImageTag(pokemon.sprites.other[item].front_default));
        if(pokemon.sprites.other[item].back_default)
            card.appendChild(createImageTag(pokemon.sprites.other[item].back_default));
        if(pokemon.sprites.other[item].front_shiny)
            card.appendChild(createImageTag(pokemon.sprites.other[item].front_shiny));
        if(pokemon.sprites.other[item].back_shiny)
            card.appendChild(createImageTag(pokemon.sprites.other[item].back_shiny));
    }
}

function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemonCard');
    card.classList.add(pokemon.types[0]);

    const pokemonImage = createImageTag(pokemon.image);
    pokemonImage.classList.add('pokemonImg');

    const cardDetails = document.createElement("div");
    cardDetails.classList.add("pokemonDetails");

    const pokemonName = document.createElement("p");
    pokemonName.classList.add('pokemonName');
    pokemonName.textContent = pokemon.name;

    cardDetails.appendChild(pokemonName);
    card.appendChild(pokemonImage);
    card.appendChild(cardDetails);

    card.addEventListener('click', async () => {
        updatePokemonProfile(await PokemonAPI.getPokemonDetailsByID(pokemon.id));
    });

    return card;
}

export { createCard };