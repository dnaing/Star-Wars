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
        // console.log(req.query);
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

app.get('/films/featured', async(req,res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        if (req.query.data && req.query.data.length > 0) {
            let data = req.query.data;
            console.log("==================");
            console.log(data);
    
            let resData = [];
    
            for (let i = 0; i < data.length; i++) {
                let dataObject =  await Film.findOne({ title: data[i] });
                resData.push(dataObject);
            }
            console.log(resData);
            res.json(resData);
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
            res.json(people);
        }  
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/people/featured', async(req,res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        if (req.query.data && req.query.data.length > 0) {
            let data = req.query.data;
            console.log("==================");
            console.log(data);
    
            let resData = [];
    
            for (let i = 0; i < data.length; i++) {
                let dataObject =  await Character.findOne({ name: data[i] });
                resData.push(dataObject);
            }
            console.log(resData);
            res.json(resData);
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

app.get('/species/featured', async(req,res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        if (req.query.data && req.query.data.length > 0) {
            let data = req.query.data;
            console.log("==================");
            console.log(data);
    
            let resData = [];
    
            for (let i = 0; i < data.length; i++) {
                let dataObject =  await Species.findOne({ name: data[i] });
                resData.push(dataObject);
            }
            console.log(resData);
            res.json(resData);
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

app.get('/planets/featured', async(req,res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        if (req.query.data && req.query.data.length > 0) {
            let data = req.query.data;
            console.log("==================");
            console.log(data);
    
            let resData = [];
    
            for (let i = 0; i < data.length; i++) {
                let dataObject =  await Planet.findOne({ name: data[i] });
                resData.push(dataObject);
            }
            console.log(resData);
            res.json(resData);
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

app.get('/planets/:id', async(req,res) => {
    try {
        
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

        const planetName = req.params.id;
        // console.log(planetName);

        if (planetName != "unknown") {
            // get single planet data from mongodb
            const planet = await Planet.find({ name: planetName });
            res.json(planet);
        }
        else if (planetName == "unknown") {
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
        else if (sortType == "Cost") {
            const starships = await Starship.find({ cost_in_credits: {$ne: "unknown"} }).sort({cost_in_credits: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(starships);
        }
        else if (sortType == "Atmosphere") {
            const starships = await Starship.aggregate([
                { $match: { max_atmosphering_speed: {$nin: ["unknown", "n/a"]} } },
                // Added fixedAtmosphere field that excludes km as a suffix from the numbers
                { $addFields: { fixedAtmosphere: { $substr: ["$max_atmosphering_speed", 0, {$indexOfCP: ["$max_atmosphering_speed", "km"]}] } } },
                { $sort: { fixedAtmosphere: sortOrderingVal } }                        
            ], { collation: { locale: "en_US", numericOrdering: true } });
            res.json(starships);
        }
        else if (sortType == "Space") {
            const starships = await Starship.find({ MGLT: {$ne: "unknown"} }).sort({MGLT: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(starships);
        }
        else if (sortType == "Length") {
            const starships = await Starship.aggregate([
                { $addFields: { lengthDouble: { $toDouble: { $replaceAll: { input: "$length", find: ",", replacement: "" } } } } },
                { $sort: { lengthDouble: sortOrderingVal } }                        
            ], { collation: { locale: "en_US", numericOrdering: true } });
            res.json(starships);
        }
        else if (sortType == "Crew") {
            const starships = await Starship.aggregate([
                { $match: { crew: {$ne: "unknown"} } },
                { $addFields: { crewDouble: { $toDouble: 
                    { 
                    $replaceAll: { 
                        input: {$replaceAll: { input: "$crew", find: ",", replacement: "" }}, 
                        find: "30-165", 
                        replacement: "165" } 
                    } } } },
                { $sort: { crewDouble: sortOrderingVal } }                        
            ], { collation: { locale: "en_US", numericOrdering: true } });
            res.json(starships);
        }
        else if (sortType == "Passenger") {
            const starships = await Starship.aggregate([
                { $match: { passengers: {$nin: ["unknown", "n/a"]} } },
                { $addFields: { lengthDouble: { $toDouble: { $replaceAll: { input: "$length", find: ",", replacement: "" } } } } },
                { $sort: { lengthDouble: sortOrderingVal } }                        
            ], { collation: { locale: "en_US", numericOrdering: true } });
            res.json(starships);
        }
        else if (sortType == "Cargo") {
            const starships = await Starship.find({ cargo_capacity: {$ne: "unknown"} }).sort({cargo_capacity: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(starships);
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/starships/featured', async(req,res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        if (req.query.data && req.query.data.length > 0) {
            let data = req.query.data;
            console.log("==================");
            console.log(data);
    
            let resData = [];
    
            for (let i = 0; i < data.length; i++) {
                let dataObject =  await Starship.findOne({ name: data[i] });
                resData.push(dataObject);
            }
            console.log(resData);
            res.json(resData);
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
        else if (sortType == "Cost") {
            const vehicles = await Vehicle.find({ cost_in_credits: {$ne: "unknown"} }).sort({cost_in_credits: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(vehicles);
        }
        else if (sortType == "Atmosphere") {
            const vehicles = await Vehicle.find({ max_atmosphering_speed: {$ne: "unknown"} }).sort({max_atmosphering_speed: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(vehicles);
        }
        else if (sortType == "Length") {
            const vehicles = await Vehicle.find({ length: {$ne: "unknown"} }).sort({length: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(vehicles);
        }
        else if (sortType == "Crew") {
            const vehicles = await Vehicle.find().sort({crew: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(vehicles);
        }
        else if (sortType == "Passenger") {
            const vehicles = await Vehicle.find({ passengers: {$ne: "unknown"} }).sort({passengers: sortOrderingVal}).collation({locale:"en_US", numericOrdering:true});
            res.json(vehicles);
        }
        else if (sortType == "Cargo") {
            const vehicles = await Vehicle.aggregate([
                { $match: { cargo_capacity: {$ne: "unknown"} } },
                { $addFields: { fixedCargo: { $replaceAll: { input: "$cargo_capacity", find: "none", replacement: "0" } } } },
                { $sort: { fixedCargo: sortOrderingVal } }                        
            ], { collation: { locale: "en_US", numericOrdering: true } });
            res.json(vehicles);
        }




    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/vehicles/featured', async(req,res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
        
        if (req.query.data && req.query.data.length > 0) {
            let data = req.query.data;
            console.log("==================");
            console.log(data);
    
            let resData = [];
    
            for (let i = 0; i < data.length; i++) {
                let dataObject =  await Vehicle.findOne({ name: data[i] });
                resData.push(dataObject);
            }
            console.log(resData);
            res.json(resData);
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










