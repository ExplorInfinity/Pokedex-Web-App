function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatString(pokemon) {
    const words = pokemon.split('-');
    return words.map(word => capitalize(word)).join(' ');
}

function createUrlString(pokemon) {
    return pokemon.split(' ').join('-');
}

export { capitalize, formatString, createUrlString };