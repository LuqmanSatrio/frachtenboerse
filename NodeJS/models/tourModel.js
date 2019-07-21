const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourSchema = new Schema({
    id: String,
    startingPoint: Object,
    endPoint: Object,
    vehicle: Object,
    contact: Object,
    internalNote: String
});

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;