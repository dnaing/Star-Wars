// The purpose of app.js in my codebase is to define all the routes for displaying
// information from my database into the frontend

// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Film = require('./schemas/films');
const Character = require('./schemas/characters');
const Species = require('./schemas/species');
const Planet = require('./schemas/planets');
const Starship = require('./schemas/starships');
const Vehicle = require('./schemas/vehicles');

const app = express();

// Connect to MongoDB Database
const dbURI = 'mongodb+srv://dereknaing01:DarkChaosLord123@starwarsdatabase.gejidxc.mongodb.net/StarWarsDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected to Star Wars Database for reading");
        app.use(cors({
            origin: 'http://localhost:3000'
        }));
        app.listen(4000, () => console.log("Server Started"));
    })
    .catch((error) => console.error(error));

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

// Define routes
app.get('/films', async(req,res) => {
    try {
        const films = await Film.find();
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        res.json(films);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/people', async(req,res) => {
    try {
        const people = await Character.find();
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        res.json(people);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/species', async(req,res) => {
    try {
        const species = await Species.find();
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        res.json(species);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})










