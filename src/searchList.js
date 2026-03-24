import { getSearchMatches, handleSearchBarInput, search } from "./search.js";

const searchBar = document.getElementById('searchBarInput');
const searchSuggestionsList = document.getElementById('searchSuggestions');

const MaxSuggestionCount = 5;

let currListIndex = -1;
searchBar.addEventListener('keydown', async (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        if (currListIndex === -1) return;

        const listItems = document.querySelectorAll("#searchSuggestions li");

        // Removing highlight from previously selected element
        listItems[currListIndex].classList.remove("highlighted");

        // New selection
        const jump = Number(e.key === "ArrowDown") * 2 - 1;
        currListIndex = (currListIndex + jump + listItems.length) % listItems.length;
        listItems[currListIndex].classList.add("highlighted");
        searchBar.value = listItems[currListIndex].getAttribute("value");
    }

    if (e.key === "Enter") {
        if(currListIndex === -1) return;

        const listItems = document.querySelectorAll("#searchSuggestions li");
        searchSuggestionsList.innerHTML = '';
        console.log(await search(listItems[currListIndex].getAttribute("value")));
    }
});

function updateCurrentInputPreview(currentInput) {
    if (!currentInput) {
        searchSuggestionsList.style.display = 'none';
        return;
    }

    const listItems = document.querySelectorAll("#searchSuggestions li");
    let currListItem;
    if (listItems.length === 0) {
        currListItem = appendListElement(currentInput);
    } else currListItem = listItems[0];

    searchSuggestionsList.style.display = 'block';
    currListIndex = 0;
    currListItem.textContent = currentInput;
    currListItem.classList.add("highlighted");
}

function appendListElement(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    listItem.setAttribute('value', text);
    searchSuggestionsList.appendChild(listItem);
    return listItem;
}

function clearList(clearInputPreview = false) {
    const listItems = document.querySelectorAll("#searchSuggestions li");
    if (listItems.length === 0) return;
    for (let i = (clearInputPreview ? 0 : 1); i < listItems.length; i++) {
        listItems[i].remove();
    }
}

function updateSearchList(searchList, currInput = "") {
    currListIndex = -1;
    clearList();

    if (searchList.length === 0 && currInput === "") {
        searchSuggestionsList.style.display = 'none';
        return;
    }

    updateCurrentInputPreview(currInput);
    const size = Math.min(MaxSuggestionCount, searchList.length);
    for (let i = 0; i < size; i++)
        appendListElement(searchList[i]);
}

export { updateSearchList, updateCurrentInputPreview };