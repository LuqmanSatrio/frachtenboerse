var Todos = require("../models/toDoModel");

module.exports = function (app) {

    app.get('/api/gettodos', function (req, res) {

        var starterTodos = [
            {
                username: "yeet",
                todo: "buy yeet shoes",
                isDone: false
            },
            {
                username: "yeet",
                todo: "buy yeet shoes",
                isDone: false
            },
            {
                username: "yeet",
                todo: "buy yeet shoes",
                isDone: false
            }
        ];

        Todos.create(starterTodos, function (err, results) {
            res.send(results)
        })
    })
};