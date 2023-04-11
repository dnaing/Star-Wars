const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to mongoDB database
const dbURI = 'mongodb+srv://dereknaing01:DarkChaosLord123@starwarsdatabase.gejidxc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
        console.log("Connected to Star Wars Database");
    })
    .catch((error) => console.error(error));









