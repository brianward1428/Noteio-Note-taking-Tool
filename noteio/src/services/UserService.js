

export default class UserService {
    constructor() {
        // this.url = "http://localhost:3000/api/";
        this.url = "https://whispering-mesa-91512.herokuapp.com/api/";


    }

    login(username, password) {
        console.log("okay were trying to login in server");
        return fetch(this.url + 'login', {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({username:username, password:password})
        }).then(res => res.json());
        
    }

    createUser(user) {
        return fetch(this.url + 'users', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json());
    }

    getUserById(uId) {
        return fetch(this.url + 'users/' + uId, {
            method: 'GET', 
            credentials: 'same-origin',
        }).then(res => res.json());
    }

    updateUser(uId, user) {
        // console.log("in userServices we are trying to update: " , JSON.stringify(user));
        return fetch(this.url + 'users/' + uId, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json());
    }

    getAllUsers() {
        return fetch(this.url + 'users/', {
            method: 'GET',
            credentials: 'same-origin',
        }).then(res => res.json());
    }

    deleteUser(uId) {
        return fetch(this.url + 'users/' + uId, {
            method: 'DELETE',
            credentials: 'same-origin',
        }).then(res => res.json());
    }






}
