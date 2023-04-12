// The purpose of app.js in my codebase is to take all the API data from the 
// Star Wars API and put it all into a MongoDB database that I have running on the cloud

// Imports
const express = require('express');
const mongoose = require('mongoose');
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
        app.listen(4000, () => console.log("Server Started"));
    })
    .catch((error) => console.error(error));

const db = mongoose.connection;

async function fetchData(url, dataType) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        switch (dataType) {
            case "films":
                insertFilms(data);
                break;
            case "people":
                insertPeople(data);
                break;
            case "species":
                insertSpecies(data);
                break;
            case "planets":
                insertPlanets(data);
                break;
            case "starships":
                insertStarships(data);
            case "vehicles":
                insertVehicles(data);
        }

        if (data["next"]) {
            console.log("Found next page");
            fetchData(data["next"], dataType);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Fetches a single film, character, planet, species, starship, vehicle and returns their name
async function fetchSingleData(url, isMovie) {

    if (url == null) {
        return "null";
    }

    return fetch(url)
      .then(response => response.json())
    
      .then(data => {
        if (isMovie) {
            return data["title"];
        }
        else {
            return data["name"];
        }
        
      })
      .catch(error => {
        console.error(error);
        return null; // return null to the caller of fetchData() if an error occurs
      });
}

// Returns an array of names of all films, characters, planets, species, vehicles, or starships
async function fetchAllData(array, isMovie) {
    if (array.length == 0) {
        return [];
    }

    let resArray = [];
    for (let i = 0; i < array.length; i++) {
        let dataPoint = fetchSingleData(array[i], isMovie);
        resArray.push(dataPoint); 
    }
    return Promise.all(resArray)
        .then((values) => {return values})
        .catch((error) => console.log(error));
}

// Functions for putting data into MongoDB

// Inserts all data about films into the database
async function insertFilms(data) {
    var filmData = data["results"];
    for (let i = 0; i < filmData.length; i++) {
        let characterNames = await(fetchAllData(filmData[i]["characters"], false));
        let speciesNames = await(fetchAllData(filmData[i]["species"], false));
        let planetNames = await(fetchAllData(filmData[i]["planets"], false));
        let starshipNames = await(fetchAllData(filmData[i]["starships"], false));
        let vehicleNames = await(fetchAllData(filmData[i]["vehicles"], false));

        let film = new Film({
            title: filmData[i]["title"],
            episode_id: filmData[i]["episode_id"],
            opening_crawl: filmData[i]["opening_crawl"],
            director: filmData[i]["director"],
            producer: filmData[i]["producer"],
            release_date: filmData[i]["release_date"],
            characters: characterNames,
            species: speciesNames,
            planets: planetNames,
            starships: starshipNames,
            vehicles: vehicleNames
        });

        film.save()
            .then((result) => {
                console.log("Film " + filmData[i]["title"] + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// Inserts all data about people into the database
async function insertPeople(data) {
    var characterData = data["results"];
    for (let i = 0; i < characterData.length; i++) {
        let homeworldName = await(fetchSingleData(characterData[i]["homeworld"], false));
        let filmNames = await(fetchAllData(characterData[i]["films"], true));
        let speciesNames = await(fetchAllData(characterData[i]["species"], false));
        let starshipNames = await(fetchAllData(characterData[i]["starships"], false));
        let vehicleNames = await(fetchAllData(characterData[i]["vehicles"], false));

        let character = new Character({
            name: characterData[i]["name"],
            height: characterData[i]["height"],
            mass: characterData[i]["mass"],
            hair_color: characterData[i]["hair_color"],
            skin_color: characterData[i]["skin_color"],
            eye_color: characterData[i]["eye_color"],
            birth_year: characterData[i]["birth_year"],
            gender: characterData[i]["gender"],
            homeworld: homeworldName,
            films: filmNames,
            species: speciesNames,
            starships: starshipNames,
            vehicles: vehicleNames
        });

        character.save()
            .then((result) => {
                console.log("Character " + characterData[i]["name"] + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

async function insertSpecies(data) {
    var speciesData = data["results"];
    for (let i = 0; i < speciesData.length; i++) {
        let homeworldName = await(fetchSingleData(speciesData[i]["homeworld"], false));
        let filmNames = await(fetchAllData(speciesData[i]["films"], true));
        let peopleNames = await(fetchAllData(speciesData[i]["people"], false));

        let species = new Species({
            name: speciesData[i]["name"],
            classification: speciesData[i]["classification"],
            designation: speciesData[i]["designation"],
            average_height: speciesData[i]["average_height"],
            hair_colors: speciesData[i]["hair_colors"],
            skin_colors: speciesData[i]["skin_colors"],
            eye_colors: speciesData[i]["eye_colors"],
            average_lifespan: speciesData[i]["average_lifespan"],
            language: speciesData[i]["language"],
            homeworld: homeworldName,
            films: filmNames,
            people: peopleNames
        });

        species.save()
            .then((result) => {
                console.log("Species " + speciesData[i]["name"] + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

async function insertPlanets(data) {
    var planetData = data["results"];
    for (let i = 0; i < planetData.length; i++) {
        let filmNames = await(fetchAllData(planetData[i]["films"], true));
        let residentNames = await(fetchAllData(planetData[i]["residents"], false));

        let planet = new Planet({
            name: planetData[i]["name"],
            rotation_period: planetData[i]["rotation_period"],
            orbital_period: planetData[i]["orbital_period"],
            diameter: planetData[i]["diameter"],
            climate: planetData[i]["climate"],
            gravity: planetData[i]["gravity"],
            terrain: planetData[i]["terrain"],
            surface_water: planetData[i]["surface_water"],
            population: planetData[i]["population"],
            films: filmNames,
            residents: residentNames
        });

        planet.save()
            .then((result) => {
                console.log("Planet " + planetData[i]["name"] + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

async function insertStarships(data) {
    var starshipData = data["results"];
    for (let i = 0; i < starshipData.length; i++) {
        let filmNames = await(fetchAllData(starshipData[i]["films"], true));
        let pilotNames = await(fetchAllData(starshipData[i]["pilots"], false));

        let starship = new Starship({
            name: starshipData[i]["name"],
            model: starshipData[i]["model"],
            manufacturer: starshipData[i]["manufacturer"],
            cost_in_credits: starshipData[i]["cost_in_credits"],
            length: starshipData[i]["length"],
            max_atmosphering_speed: starshipData[i]["max_atmosphering_speed"],
            crew: starshipData[i]["crew"],
            passengers: starshipData[i]["passengers"],
            cargo_capacity: starshipData[i]["cargo_capacity"],
            consumables: starshipData[i]["consumables"],
            hyperdrive_rating: starshipData[i]["hyperdrive_rating"],
            MGLT: starshipData[i]["MGLT"],
            starship_class: starshipData[i]["starship_class"],
            films: filmNames,
            pilots: pilotNames
        });

        starship.save()
            .then((result) => {
                console.log("Starship " + starshipData[i]["name"] + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

async function insertVehicles(data) {
    var vehicleData = data["results"];
    for (let i = 0; i < vehicleData.length; i++) {
        let filmNames = await(fetchAllData(vehicleData[i]["films"], true));
        let pilotNames = await(fetchAllData(vehicleData[i]["pilots"], false));

        let vehicle = new Vehicle({
            name: vehicleData[i]["name"],
            model: vehicleData[i]["model"],
            manufacturer: vehicleData[i]["manufacturer"],
            cost_in_credits: vehicleData[i]["cost_in_credits"],
            length: vehicleData[i]["length"],
            max_atmosphering_speed: vehicleData[i]["max_atmosphering_speed"],
            crew: vehicleData[i]["crew"],
            passengers: vehicleData[i]["passengers"],
            cargo_capacity: vehicleData[i]["cargo_capacity"],
            consumables: vehicleData[i]["consumables"],
            vehicle_class: vehicleData[i]["vehicle_class"],
            films: filmNames,
            pilots: pilotNames
        });

        vehicle.save()
            .then((result) => {
                console.log("Vehicle " + vehicleData[i]["name"] + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// Extract Star Wars API data into MongoDB Database

baseURL = "https://swapi.dev/api/"

db.on('error', (error) => console.error(error));

db.once('open', () => {

    Film.countDocuments()
        .then((count) => {
            if (count == 0) {
                console.log("ADDING FILM DATA TO MONGODB");
                fetchData(baseURL + "films/", "films");
            }
            else {
                console.log("FILM DATA ALREADY COLLECTED");
            }
        })
        .catch((error) => console.log(error));

    Character.countDocuments()
        .then((count) => {
            if (count == 0) {
                console.log("ADDING PEOPLE DATA");
                fetchData(baseURL + "people/", "people");
            }
            else {
                console.log("CHARACTER DATA ALREADY COLLECTED");
            }
        })
        .catch((error) => console.log(error));  
    
    Species.countDocuments()
        .then((count) => {
            if (count == 0) {
                console.log("ADDING SPECIES DATA");
                fetchData(baseURL + "species/", "species");
            }
            else {
                console.log("SPECIES DATA ALREADY COLLECTED");
            }
        })
        .catch((error) => console.log(error)); 

    Planet.countDocuments()
        .then((count) => {
            if (count == 0) {
                console.log("ADDING PLANET DATA");
                fetchData(baseURL + "planets/", "planets");
            }
            else {
                console.log("PLANET DATA ALREADY COLLECTED");
            }
        })
        .catch((error) => console.log(error)); 

    Starship.countDocuments()
        .then((count) => {
            if (count == 0) {
                console.log("ADDING STARSHIP DATA");
                fetchData(baseURL + "starships/", "starships");
            }
            else {
                console.log("STARSHIP DATA ALREADY COLLECTED");
            }
        })
        .catch((error) => console.log(error)); 
    
    Vehicle.countDocuments()
        .then((count) => {
            if (count == 0) {
                console.log("ADDING VEHICLE DATA");
                fetchData(baseURL + "vehicles/", "vehicles");
            }
            else {
                console.log("VEHICLE DATA ALREADY COLLECTED");
            }
        })
        .catch((error) => console.log(error)); 
    
    
    Character.find({ species: [] }).countDocuments()
    .then((count) => {
        if (count != 0) {
            console.log("There are " + count + " missing species fields for the characters");
            // We must fix the droid, "R4-P17"
            Character.updateOne( { name: "R4-P17" }, { $set: {species: ["Droid"]} } )
                .then(res => {
                    console.log("R4-P17 fixed");
                })
            Species.updateOne( { name: "Droid"}, { $push: {people: 'R4-P17'} } )
                .then(res => {
                    console.log("R4-P17 added to Droid species");
                });

            // Now we have to fix "Sly Moore"
            Character.updateOne( { name: "Sly Moore" }, { $set: {species: ["Umbaran"]} } )
                .then(res => {
                    console.log("Sly Moore fixed");
                })
            
            const umbaran = new Species({
                name: "Umbaran",
                classification: "near-human",
                designation: "sentient",
                average_height: "unknown",
                hair_colors: "black, silver, white",
                skin_colors: "pale, bluish",
                eye_colors: "gray, pale blue, white",
                average_lifespan: "unknown",
                language: "Umbarese",
                homeworld: "Umbara",
                films: ["Attack of the Clones", "Revenge of the Sith"],
                people: ["Sly Moore"]
            });

            umbaran.save()
            .then((result) => {
                console.log("Species " + "Umbaran" + " was saved to the database");
            })
            .catch((error) => {
                console.log(error);
            });

            // Now we have to fix all humans
            Character.find( { species: [] }).select( "name" )
                .then(res => {
                    const humanNames = res.map(result => result.name);
                    Character.updateMany( { species: [] }, { $set: {species: ["Human"]} } )
                        .then(res => {
                            console.log("Human species added to all humans");
                        })
                    Species.updateOne( { name: "Human" }, { $push: {people: { $each: humanNames} } } )
                        .then(res => {
                            console.log("All human names added into human species");
                        });
                })

        }
        else {
            console.log("DATABASE UPDATED");
        }
    })
    
});

// Add additional information to database
//=====================================================================


// Add human as the species to all humans who currently don't have it
// Add the names of every human to the name field in the human species

// Add droid as the species to R4-P17
// Add that droid's name to the name field in the droid species

// Add Umbaran to Sly Moore
// Add Umbaran species and give it information
//         Add Sly Moore's name in the Umbaran species's name field
// Add more info to the Umbaran planet
