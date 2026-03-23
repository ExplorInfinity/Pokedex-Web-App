const searchSuggestionsList = document.getElementById('searchSuggestions');

function updateSearchList(searchList) {
    searchSuggestionsList.innerHTML = '';

    if (searchList.length === 0) {
        searchSuggestionsList.style.display = 'none';
        return;
    }

    searchSuggestionsList.style.display = 'block';
    const size = Math.min(5, searchList.length);
    for (let i = 0; i < size; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = searchList[i];
        searchSuggestionsList.appendChild(listItem);
    }
}

export { updateSearchList };