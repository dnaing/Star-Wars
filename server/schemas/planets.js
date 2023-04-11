const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetsSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    rotation_period: {
        type: String,
        required: true
    },
    orbital_period: {
        type: String,
        required: true
    },
    diameter: {
        type: String,
        required: true
    },
    climate: {
        type: String,
        required: true
    },
    gravity: {
        type: String,
        required: true
    },
    terrain: {
        type: String,
        required: true
    },
    surface_water: {
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true
    },
    films: {
        type: [],
        required: false
    },
    residents: {
        type: [],
        required: false
    }
}, { timestamps: true });

const Planet = mongoose.model('Planet', planetsSchema);
module.exports = Planet;