

export default class SectionService {
    constructor() {
        // this.url = "http://localhost:3000/api/notebooks/";
        this.url = "https://whispering-mesa-91512.herokuapp.com/api/notebooks/";

    }

    createSection(nId, section) {
        return fetch(this.url + nId + '/sections' ,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(section)
        }).then(res => res.json());

    };

    updateSection(nId, sId, section) {
        return fetch(this.url + nId + '/sections/' + sId ,{
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(section)
        }).then(res => res.json());
    }




}
