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

function isIntegerString(str) {
    return /^\d+$/.test(str);
}

function storeMap(key, map) {
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(map)));
}

function getStoredMap(key) {
    if (!localStorage.getItem(key))
        return null;
    const obj = JSON.parse(localStorage.getItem(key));
    return new Map(Object.entries(obj));
}

function getLocalStorage(key) {
    if (!localStorage.getItem(key))
        return null;
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export { capitalize, formatString, createUrlString, isIntegerString, storeMap, getStoredMap, getLocalStorage, setLocalStorage };