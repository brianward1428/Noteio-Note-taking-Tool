require('./data/db')();
var userDao = require('./daos/user.dao.server');
// userDao.find((err, users) => {
//     console.log(users);
// });

// userDao.findUserById('5fb82caef6588d9f2d44c6bd').then(user =>
// console.log(user)).catch(err => console.log(err));

userDao.createUser({username:'user2', password:'pass3', firstName: 'bob', lastName: 'wilson', email: 'bob@gmail.com', dateJoined: Date.now(), isPremiumUser: true})
    .then(u => console.log(u)).catch(err => console.log(err));

// userDao.findAllUsers().then(users => {
//     console.log(users)}).catch(err => console.log(err));
