require('../data/db')();
var striptags = require('striptags');
var hash = require('pbkdf2-password')();
var bodyParser = require('body-parser');
var userDao = require('../daos/user.dao.server');
const e = require('express');


module.exports = (app) => {

    var jsonBodyParser = bodyParser.json();
    var urlEncodedBodyParser = bodyParser.urlencoded({extended: false});

    app.use(jsonBodyParser);


    const createUser = (req, res) => {
        console.log(req.body);
        let newUser = req.body;
        let username = striptags(req.body.username);
        if (username !== req.body.username) {
            res.json({status: 'Invalid username'});
            return
        }

        hash({password: newUser.password}, (err, pass, salt, hash) => {
            // console.log('new user =', newUser);
            // newUser._id = new Date().getTime();
            // newUser.websites = newUser.websites.split(/,\s*/);
            newUser.hash = hash;
            newUser.salt = salt;
            // users.push(newUser);
            console.log("trying to create new user : ", newUser);
            userDao.createUser(newUser).then(respUser => {
                console.log("resp user : ", respUser);
                delete respUser.hash;
                delete respUser.salt;
                delete respUser.password;
                // we can set the user now.
                req.session.user = respUser;

                res.json(respUser)
            }).catch(err => console.log(err));
            // console.log("resp user : ", respUser);

            // delete respUser.hash;
            // delete respUser.salt;
            // delete respUser.password;
            // /// so were returning a copy of the user w/o the hash, salt, and password.
            // res.json(respUser)
        });
    };
    app.post('/api/users', createUser);


    function authenticate(userName, pass, fn) {
        console.log('authenticating %s:%s', userName, pass);
        // var user = users.find(u => u.username === name); //users[name];
        
        userDao.findUserByUserName(userName).then(user => {

            if (user){
                console.log('found user: ', user);
                hash({password: pass, salt: user.salt}, function (err, pass, salt, hash) {
                    if (err) {
                        return fn(err, null);
                    }
                    if (hash === user.hash) {
                        console.log('successful login');
                        return fn(null, user)
                    }
                    return fn(new Error('invalid password'), null);
                });

            } else {
                return fn(new Error('cannot find user by that userName'), null);
            }
        })
    }
    

    app.post('/api/login', function (req, res) {
        authenticate(req.body.username, req.body.password, function (err, user) {
            if (err) {
                console.log("oops error logging in, ");
                res.send({status: err.toString()})
            }
            // console.log("auth succeeded, ", user);
            else if (user) {
                // Regenerate session when signing in to prevent fixation
                req.session.regenerate(function () {
                    // Store the user's primary key
                    // in the session store to be retrieved,
                    // or in this case the entire user object
                    // let respUser = {...user};
                    // delete user.password;
                    req.session.user = { _id: user._id,
                        firstName: user.firstName,
                        salt: user.salt,
                        hash: user.hash,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin};
                    console.log("set user in session: ", req.session.user);
                    // req.session.success = 'Authenticated as ' + user.name
                    //                       + ' click to <a href="/logout">logout</a>. '
                    //                       + ' You may now access <a href="/restricted">/restricted</a>.';
                    //res.redirect('back');
                    res.json({ _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin})
                });
            } else {
                req.session.error = 'Authentication failed, please check your '
                                    + ' username and password.';
                res.redirect('/login');
            }
        });
    });

    /**
     * Okay so this is where we actually check if someone is logged in. This makes sene. 
     * So we can actually just pass this in 
     */
    const restricted = (req, res, next) => {
        if (req.session.user) {
            // so if someone is logged in then we can just continue on to the next call.
            next();
        } else {
            req.session.error = 'Access denied!';
            res.json({status: "Not authenticated"})
        }
    };

     /**
     * So we can make another check to see if someone is an admin.
     */
    const isAdmin = (req, res, next) => {
        if (req.session.user) {
            if (req.session.user.isAdmin){
                // Success.
                next();
            } else {
                req.session.error = 'Access denied : No Admin Status';
                res.json({status: "Access denied : No Admin Status"})
            }
        } else {
            req.session.error = 'Access denied : Not logged in';
            res.json({status: 'Access denied : Not logged in'})
        }
    };



    const findAllUsers = (req, res) => {
        
        console.log("trying to fetch all users..");
        userDao.findAllUsers().then(users => {
                                    console.log("found users :", users);
                                    res.json(users);
                                    }).catch(err => res.json({status: err}));
    };

    app.get("/api/users", findAllUsers);


    /**
     * So here were basically saying if a user tries to find a user by Id. we automatically just call it on their userId?
     * I dont get why we would do that.
     * 
     */
    

    const findUserById = (req, res) => {
        // console.log(req.session);
            // req.session.user = users.find(u => u._id === req.params.id);
        userDao.findUserById(req.params.id).then(resp => {
        console.log("find user response :", resp);
        res.json(resp);
        }).catch(err => res.json({status: err}));
    };
    app.get("/api/users/:id", findUserById);



    const updateUser = (req, res) => {
        console.log("going to try to update user, userID =", req.params.id);
        console.log("update body =",  req.body);

        userDao.updateUser(req.params.id, req.body).then(resp => {
            console.log("update response :", resp);
            res.json(resp);
        }).catch(err => res.json({status: err}));
    };
    app.put('/api/users/:id', updateUser);


    const deleteUser = (req, res) => {
        userDao.deleteUser(req.params.id).then(resp => {
            console.log("delete user response :", resp);
            res.json(resp);
        }).catch(err => res.json({status: err}));
    };
    app.delete('/api/users/:id', deleteUser);
};
