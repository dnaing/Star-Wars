const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charactersSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    height: {
        type: Number,
        required: true
    },
    mass: {
        type: String,
        required: true
    },
    hair_color: {
        type: String,
        required: true
    },
    skin_color: {
        type: String,
        required: true
    },
    eye_color: {
        type: String,
        required: true
    },
    birth_year: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    homeworld: {
        type: String,
        required: true
    },
    films: {
        type: [],
        required: false
    },
    species: {
        type: [],
        required: false
    },
    starships: {
        type: [],
        required: false
    },
    vehicles: {
        type: [],
        required: false
    }
}, { timestamps: true });

const Character = mongoose.model('Character', charactersSchema);
module.exports = Character;