import { capitalize } from '../utils.js';
import { hasFavorite, toggleFavorite, showFavorites } from "../favorites.js";

const MaxStatValues = {
    hp: 255, def: 230, atk: 190, speed: 200
};

const pokemonProfileElement = document.querySelector('.pokemonProfile');

// Details Section
const detailsSection = pokemonProfileElement.querySelector('.detailsSection');
const pokemonNameElement = detailsSection.querySelector('.pokemonName');
const pokemonIDElement = detailsSection.querySelector('.pokemonID');
const pokemonTypesSection = detailsSection.querySelector('.pokemonTypes');
const pokemonDescriptionElement = detailsSection.querySelector('.pokemonDescription');

// Pokemon Stats
const pokemonStatsElement = detailsSection.querySelector('.pokemonStats');
const hpElement = document.getElementById('hp');
const atkElement = document.getElementById('atk');
const defElement = document.getElementById('def');
const spdElement = document.getElementById('speed');

// More Info
const attributesSection = detailsSection.querySelector('.attributes');
const pokemonHeightElement = document.getElementById('pokemonHeight');
const pokemonWeightElement = document.getElementById('pokemonWeight');
const pokemonCategoryElement = document.getElementById('pokemonCategory');
const pokemonAbilityElement = document.getElementById('pokemonAbility');

// Image Section
const imageSection = pokemonProfileElement.querySelector('.imageSection');
const skeletonLoading = imageSection.querySelector('.skeletonLoading');
const pokemonImageElement = imageSection.querySelector('.pokemonImage');

let currentPokemon = null;
const favoriteBtn = document.getElementById('pokemonFavoriteBtn');
favoriteBtn.addEventListener('click', async e => {
    e.preventDefault();
    favoriteBtn.classList.toggle('filledHeart');
    if (currentPokemon) {
        toggleFavorite(currentPokemon);
        await showFavorites();
    }
});

function startImageLoadingAnimation() {
    pokemonImageElement.style.display = 'none';
    skeletonLoading.classList.remove('hide');
    pokemonImageElement.classList.remove('active');
}

function showImage() {
    skeletonLoading.classList.add('hide');
    pokemonImageElement.classList.add('active');
    pokemonImageElement.style.display = 'block';
}

function createTypeContainer(type) {
    const container = document.createElement('div');
    container.classList.add('pokemonType');
    container.classList.add(type);

    const icon = document.createElement('div');
    icon.classList.add('typeIcon');
    icon.appendChild(document.createElement('div'));

    container.appendChild(icon);
    container.append(capitalize(type));
    return container;
}

function updateTypes(types) {
    pokemonTypesSection.innerHTML = ' ';
    types.forEach(type => pokemonTypesSection.appendChild(createTypeContainer(type)));
}

function updateStats(pokemonStats) {
    hpElement .style.setProperty('--value', `${pokemonStats.hp / MaxStatValues.hp * 100}%`);
    atkElement.style.setProperty('--value', `${pokemonStats.attack / MaxStatValues.atk * 100}%`);
    atkElement.style.setProperty('--special-value', `${pokemonStats["special-attack"] / MaxStatValues.atk * 100}%`);
    defElement.style.setProperty('--value', `${pokemonStats.defense / MaxStatValues.def * 100}%`);
    defElement.style.setProperty('--special-value', `${pokemonStats["special-defense"] / MaxStatValues.def * 100}%`);
    spdElement.style.setProperty('--value', `${pokemonStats.speed / MaxStatValues.speed * 100}%`);

    defElement.style.setProperty("--z-index", (pokemonStats["special-defense"] <= pokemonStats["defense"]) ? 1 : 2);
    defElement.style.setProperty("--special-z-index", (pokemonStats["special-defense"] <= pokemonStats["defense"]) ? 2 : 1);
    atkElement.style.setProperty("--z-index", (pokemonStats["special-attack"] <= pokemonStats["attack"]) ? 1 : 2);
    atkElement.style.setProperty("--special-z-index", (pokemonStats["special-attack"] <= pokemonStats["attack"]) ? 2 : 1);
}

function updatePokemonProfile(pokemon) {
    pokemonNameElement.textContent = pokemon.name;
    pokemonIDElement.textContent = pokemon.getID();
    pokemonDescriptionElement.textContent = pokemon.getDescription();

    pokemonImageElement.src = pokemon.image;
    pokemonImageElement.onload = () => {
        showImage();
    };

    updateTypes(pokemon.types);
    document.body.className = `${pokemon.types[0]} light-solid-color`;

    updateStats(pokemon.stats);

    pokemonHeightElement.textContent = `${pokemon.height / 10} m`;
    pokemonWeightElement.textContent = `${pokemon.weight / 10} kg`;
    pokemonCategoryElement.textContent = pokemon.category;
    pokemonAbilityElement.textContent = pokemon.ability;

    if(hasFavorite(pokemon))
        favoriteBtn.classList.add('filledHeart');
    else
        favoriteBtn.classList.remove('filledHeart');

    currentPokemon = pokemon;
}

export { currentPokemon, updatePokemonProfile, startImageLoadingAnimation };