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
        let sortOrdering = req.query.sortOrdering;
        let sortOrderingVal;

        if (sortOrdering == "ascending") {
            sortOrderingVal = 1;
        } else {
            sortOrderingVal = -1;
        }


        if (sortType === undefined || sortType == "Alpha") {
            const people = await Character.find().sort({name: sortOrderingVal});
            res.json(people);
        }

        else if (sortType == "Height") {

            const people = await Character.find({ height: {$ne: "unknown"} }).sort({height: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(people);
        }
        else if (sortType == "Mass") {

            const people = await Character.aggregate([
                { $match: { mass: {$ne: "unknown"} } },
                { $addFields: { massDouble: { $toDouble: { $replaceAll: { input: "$mass", find: ",", replacement: "" } } } } },
                { $sort: { massDouble: sortOrderingVal } }                        
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
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

        let sortType = req.query.sortType;
        let sortOrdering = req.query.sortOrdering;
        let sortOrderingVal;

        if (sortOrdering == "ascending") {
            sortOrderingVal = 1;
        } else {
            sortOrderingVal = -1;
        }
        
        if (sortType === undefined || sortType == "Alpha") {
            const species = await Species.find().sort({name: sortOrderingVal});
            res.json(species);
        }   
        
        else if (sortType == "Height") {

            const species = await Species.find({ average_height: {$nin: ["unknown", "n/a"]} }).sort({average_height: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(species);
        }
        else if (sortType == "Lifespan") {

            const species = await Species.find({ average_lifespan: {$nin: ["unknown", "indefinite"]} }).sort({average_lifespan: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(species);
        }

    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/planets', async(req,res) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        

        let sortType = req.query.sortType;
        let sortOrdering = req.query.sortOrdering;
        let sortOrderingVal;

        if (sortOrdering == "ascending") {
            sortOrderingVal = 1;
        } else {
            sortOrderingVal = -1;
        }
        
        if (sortType === undefined || sortType == "Alpha") {
            const planets = await Planet.find().sort({name: sortOrderingVal});
            res.json(planets);
        } 
        else if (sortType == "Population") {
            const planets = await Planet.find({ population: {$ne: "unknown"} }).sort({population: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(planets);
        }
        else if (sortType == "Size") {
            const planets = await Planet.find({ diameter: {$ne: "unknown"} }).sort({diameter: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(planets);
        }
        else if (sortType == "Rotation") {
            const planets = await Planet.find({ rotation_period: {$ne: "unknown"} }).sort({rotation_period: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(planets);
        }
        else if (sortType == "Orbital") {
            const planets = await Planet.find({ orbital_period: {$ne: "unknown"} }).sort({orbital_period: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(planets);
        }

    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/planets/:id', async(req,res) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

        const planetName = req.params.id;
        console.log(planetName);

        if (planetName != "unknown") {
            // get single planet data from mongodb
            const planet = await Planet.find({ name: planetName });
            res.json(planet);
        }
        else {
            res.json([]);
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/starships', async(req,res) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        let sortType = req.query.sortType;
        let sortOrdering = req.query.sortOrdering;
        let sortOrderingVal;

        if (sortOrdering == "ascending") {
            sortOrderingVal = 1;
        } else {
            sortOrderingVal = -1;
        }

        if (sortType === undefined || sortType == "Alpha") {
            const starships = await Starship.find().sort({name: sortOrderingVal});
            res.json(starships);
        } 

    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/vehicles', async(req,res) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
       

        let sortType = req.query.sortType;
        let sortOrdering = req.query.sortOrdering;
        let sortOrderingVal;

        if (sortOrdering == "ascending") {
            sortOrderingVal = 1;
        } else {
            sortOrderingVal = -1;
        }

        if (sortType === undefined || sortType == "Alpha") {
            const vehicles = await Vehicle.find().sort({name: sortOrderingVal});
            res.json(vehicles);
        } 
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})










