// import * as bodyParser from "express";
var express = require('express');
var session = require('express-session');
var cors = require('cors');

var app = express();

app.use(session ( {
    resave: false, // dont save session if un-modified
    saveUninitialized: false, // dont create a session until something is stored
    secret: 'bward-kmonmvoijnasdfjlksjdllkjdfdddd'
                  }));

// var jsonBodyParser = bodyParser.json();
// var urlEncodedBodyParser = bodyParser.urlencoded({extended: false})
//
// app.use(jsonBodyParser);



app.use(cors({
                 origin: '*',
                 credentials: true,
             }));



require('./controllers/users.controller.server')(app);
require('./controllers/sections.controller.server')(app);
require('./controllers/notebooks.controller.server')(app);


app.listen(process.env.PORT || 3000);
