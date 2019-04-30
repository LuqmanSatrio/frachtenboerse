const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const freightSchema = new Schema({
    id: String,
    endPoints: Array,
    freight: Object,
    neededVehicle: Object,
    contact: Object,
    internalNote: String
});

const Freights = mongoose.model('freight', freightSchema);

module.exports = Freights;