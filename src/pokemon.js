import { formatString } from "./utils.js";

class Pokemon {
    static getGenderDetails(genderRate) {
        if (genderRate === -1)
            return { male: 0, female: 0 };

        return {
            female: Math.round(genderRate / 8 * 100),
            get male() { return 100 - this.female }
        };
    }

    static createPokemonInstance(pokemonDetails) {
        const pokemon = new Pokemon();
        pokemon.id = pokemonDetails.id;
        pokemon.name = formatString(pokemonDetails.name);
        pokemon.lowerCaseName = pokemon.name.toLowerCase();
        pokemon.baseExp = pokemonDetails.base_experience;
        pokemon.height = pokemonDetails.height;
        pokemon.weight = pokemonDetails.weight;
        pokemon.ability = formatString(pokemonDetails.abilities.length ? pokemonDetails.abilities[0].ability.name : "None");
        pokemon.types = pokemonDetails.types.map(t => t.type.name);
        pokemon.image = pokemonDetails.sprites.other["official-artwork"].front_default;
        pokemon.dreamWorldImg = pokemonDetails.sprites.other.dream_world.front_default;
        pokemon.gif = pokemonDetails.sprites.other.showdown.front_default;
        pokemon.descriptions = pokemonDetails.flavor_text_entries.filter(e => e.language.name === "en").map(e => e.flavor_text.replace(/\f/g, " ").replace(/\n/g, " "));
        pokemon.category = pokemonDetails.genera.find(g => g.language.name === "en").genus;
        pokemon.evolutionChain = pokemonDetails.evolution_chain;

        pokemon.stats = {};
        pokemonDetails.stats.forEach(s => pokemon.stats[s.stat.name] = s.base_stat );

        pokemon.gender = Pokemon.getGenderDetails(pokemonDetails.gender_rate);
        pokemon.varieties = pokemonDetails.varieties.map(v => v.pokemon.name);
        console.log(pokemon.varieties);

        return pokemon;
    }

    getID() {
        return `#${this.id.toString().padStart(4, '0')}`;
    }

    getDescription() {
        return this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
    }

    getEvolutionChain() {

    }
}

export default Pokemon;