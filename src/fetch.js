async function fetchURL(url, options = {}) {
    try {
        const request = await fetch(url);
        const json = await request.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export default fetchURL;