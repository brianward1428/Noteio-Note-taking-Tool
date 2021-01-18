const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
                                       username: {type: String, required:true },
                                       password: {type: String, required:true },
                                       firstName: {type: String, required:true },
                                       lastName: {type: String, required:true },
                                        email: {type: String, required:true },
                                        hash: {type: String, required:true },
                                        salt: {type: String, required:true },
                                        isAdmin: {type: Boolean, required:true },
                                        
                                   }, {timestamps: true, collection: 'users'});

module.exports = userSchema;
