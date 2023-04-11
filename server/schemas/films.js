const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmsSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    episode_id: {
        type: Number,
        required: true
    },
    opening_crawl: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Film = mongoose.model('Film', filmsSchema);
module.exports = Film;