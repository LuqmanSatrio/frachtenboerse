const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const freightSchema = new Schema({
    id: String,
    startingPoint: Object,
    pointsBetween: Array,
    endPoint: Object,
    freight: Object,
    neededVehicle: Object,
    contact: Object,
    internalNote: String
});

const Freights = mongoose.model('freight', freightSchema);

module.exports = Freights;