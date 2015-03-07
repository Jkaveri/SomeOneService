/**
 * Created by Ho on 1/25/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PlaceSchema = new Schema({
    name: String,
    address: String,
    state: String,
    ward: String,
    district: String,
    city: String,
    formatted: String,
    country: String,
    loc: []
});

module.exports = {
    model: mongoose.model('Place', PlaceSchema),
    schema: PlaceSchema
};
