const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const starshipsSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    cost_in_credits: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    max_atmosphering_speed: {
        type: String,
        required: true
    },
    crew: {
        type: String,
        required: true
    },
    passengers: {
        type: String,
        required: true
    },
    cargo_capacity: {
        type: String,
        required: true
    },
    consumables: {
        type: String,
        required: true
    },
    hyperdrive_rating: {
        type: String,
        required: true
    },
    MGLT: {
        type: String,
        required: true
    },
    starship_class: {
        type: String,
        required: true
    },
    films: {
        type: [],
        required: false
    },
    pilots: {
        type: [],
        required: false
    }
}, { timestamps: true });

const Starship = mongoose.model('Starship', starshipsSchema);
module.exports = Starship;