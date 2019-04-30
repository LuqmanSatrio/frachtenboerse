const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    username: String,
    todo: String,
    done: Boolean
});

const ToDos = mongoose.model('Todos', todoSchema);

module.exports = ToDos;