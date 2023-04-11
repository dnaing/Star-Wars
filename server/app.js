// The purpose of app.js in my codebase is to take all the API data from the 
// Star Wars API and put it all into a MongoDB database that I have running on the cloud

// Imports
const express = require('express');
const mongoose = require('mongoose');
const Film = require('./schemas/films');
const Character = require('./schemas/characters');

const app = express();

// Connect to MongoDB Database
const dbURI = 'mongodb+srv://dereknaing01:DarkChaosLord123@starwarsdatabase.gejidxc.mongodb.net/StarWarsDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(8080);
        console.log("Connected to Star Wars Database");
    })
    .catch((error) => console.error(error));

function fetchData(url, dataType) {
    return fetch(url)
      .then(response => response.json())
    
      .then(data => {

        switch (dataType) {
            case "films":
                insertFilms(data);
                break;
            case "people":
                insertPeople(data);
                break;
        }

        if (data["next"]) {
            console.log("Found next page");
            fetchData(data["next"], dataType);
        }
        
      })
      .catch(error => {
        console.error(error);
        return null; // return null to the caller of fetchData() if an error occurs
      });
}

// Fetches a single film, character, planet, species, starship, vehicle and returns their name
async function fetchSingleData(url, isMovie) {
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
function insertPeople(data) {
    var characterData = data["results"];

    for (let i = 0; i < characterData.length; i++) {
        let character = new Character({
            name: characterData[i]["name"],
            height: characterData[i]["height"],
            mass: characterData[i]["mass"],
            hair_color: characterData[i]["hair_color"],
            skin_color: characterData[i]["skin_color"],
            eye_color: characterData[i]["eye_color"],
            birth_year: characterData[i]["birth_year"],
            gender: characterData[i]["gender"],
            homeworld: characterData[i]["homeworld"],
            films: characterData[i]["films"],
            species: characterData[i]["species"],
            starships: characterData[i]["starships"],
            vehicles: characterData[i]["vehicles"]
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


// Extract Star Wars API data into MongoDB Database

baseURL = "https://swapi.dev/api/"

const db = mongoose.connection;
db.once('open', async () => {
    if (!db.collections['films']) {
        console.log("ADDING FILM DATA");
        fetchData(baseURL + "films/", "films");        
    }

    if (!db.collections['characters']) {
        console.log("ADDING PEOPLE DATA");
        fetchData(baseURL + "people/", "people");     
    }
});












