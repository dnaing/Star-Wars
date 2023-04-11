const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speciesSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    classification: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    average_height: {
        type: String,
        required: true
    },
    skin_colors: {
        type: String,
        required: true
    },
    hair_colors: {
        type: String,
        required: true
    },
    eye_colors: {
        type: String,
        required: true
    },
    average_lifespan: {
        type: String,
        required: true
    },
    homeworld: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: true
    },
    films: {
        type: [],
        required: false
    },
    people: {
        type: [],
        required: false
    }
}, { timestamps: true });

const Species = mongoose.model('Species', speciesSchema);
module.exports = Species;