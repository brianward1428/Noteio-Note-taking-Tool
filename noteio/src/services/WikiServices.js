

export default class WikiService {
    constructor() {
        this.url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=10&gsrsearch=";

    }


    searchWiki(term) {
        return fetch(this.url + term)
            .then(response => response.json())
    }


    getWikiPage(pageId){
        return fetch("https://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&pageids=" + pageId +"&redirects=true&origin=*")
            .then(response => response.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))

    }
}