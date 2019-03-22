var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    username: String,
    todo: String,
    done: Boolean
});

var ToDos = mongoose.model('Todos', todoSchema);

module.exports = ToDos;