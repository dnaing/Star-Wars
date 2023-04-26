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
        console.log(req.query);
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
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

        let sortType = req.query.sortType;

        if (sortType === undefined || sortType == "Default") {
            const people = await Character.find();
            res.json(people);
        }

        else if (sortType == "Alpha") {
            const people = await Character.find().sort({name: 1});
            res.json(people);
        }

        else if (sortType == "Height") {

            const people = await Character.find({ height: {$ne: "unknown"} }).sort({height: 1}).collation({locale:"en_US", numericOrdering:true});
            res.json(people);
        }
        else if (sortType == "Mass") {

            const people = await Character.aggregate([
                { $match: { mass: {$ne: "unknown"} } },
                { $addFields: { massDouble: { $toDouble: { $replaceAll: { input: "$mass", find: ",", replacement: "" } } } } },
                { $sort: { massDouble: 1 } }                        
            ], { collation: { locale: "en_US", numericOrdering: true } });
            // const people = await Character.find({ mass: {$ne: "unknown"} }).sort({mass: 1}).collation({locale:"en_US", numericOrdering:true});
            res.json(people);
        }
        
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

app.get('/planets', async(req,res) => {
    try {
        const planets = await Planet.find();
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        res.json(planets);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/starships', async(req,res) => {
    try {
        const starships = await Starship.find();
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        res.json(starships);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/vehicles', async(req,res) => {
    try {
        const vehicles = await Vehicle.find();
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        res.json(vehicles);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})










