const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
    name: String,
    brewery: String,
    beer_style: [],
    abv: String,
    description: String,
    likes: { type: Number, default : 0}
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
