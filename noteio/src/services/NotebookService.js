

export default class NotebookService {
    constructor() {
        // this.url = "http://localhost:3000/api/";
        this.url = "https://whispering-mesa-91512.herokuapp.com/api/";

    }

    getAllNotebooks() {
        return fetch(this.url + "notebooks")
            .then(response => response.json());
    }

    createNotebook(noteBook) {
        return fetch(this.url + 'notebooks', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteBook)
        }).then(res => res.json());
    }

    updateNotebook(nId, notebook) {
        return fetch(this.url + 'notebooks/' + nId, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notebook)
        }).then(res => res.json());

    }

    deleteNotebook(nId) {
        return fetch(this.url + 'notebooks/' + nId, {
            method: 'DELETE',
            credentials: 'same-origin',
        }).then(res => res.json());

    }

}
