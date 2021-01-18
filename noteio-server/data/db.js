module.exports = function () {
    const mongoose = require('mongoose');
    require('dotenv').config();
    // const databaseName = 'whiteboard';
    const connectionString = process.env.MONGODB_URI;
    // connectionString += databaseName;
    // TODO: useUnifiedTopology was assumed to be true. can check in professors git
    mongoose.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true});
};
