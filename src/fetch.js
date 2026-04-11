const logo = document.getElementById("logo");
async function fetchURL(url, options = {}) {
    logo.classList.add('loading');
    try {
        const request = await fetch(url);
        const json = await request.json();
        return json;
    } catch (error) {
        console.error(error);
    } finally {
        logo.classList.remove('loading');
    }
}

export default fetchURL;