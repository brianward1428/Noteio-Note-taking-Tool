const mongoose = require('mongoose');
const userSchema = require('../models/user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

/**
 *
 * Now we can create our functions and export those instead.
 */

const findAllUsers = () => userModel.find();
const findUserById = (uId) => userModel.findById(uId);
const findUserByUserName = (userName) => userModel.findOne({username: userName});
const createUser = (user) => userModel.create(user);
const updateUser = (userId, user) => userModel.findByIdAndUpdate(userId,{...user}, {new: true});
const deleteUser = (userId) => userModel.findByIdAndRemove(userId);

module.exports = {findAllUsers, findUserById, findUserByUserName, createUser, updateUser, deleteUser};

