let ToDos = require('../models/toDoModel');
let Freights = require('../models/freightModel')
var bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: true}));

    app.get('/api/todo/:uname', function (req, res) {

        ToDos.find({ username:req.params.uname },
            function (err, todos) {
                if (err){
                    alert(err)
                }
                else {
                    res.send(todos)
                }
            })
    });

    app.get('/api/todo/:id', function (req, res) {

        ToDos.findById(req.params.id,
            function (err, todo) {
                if (err){
                    alert(err)
                }
                else {
                    res.send(todo)
                }
            })
    });

    app.post('/api/todo', function (req, res) {

        if(req.body.id){
            ToDos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo, isDone: req.body.isDone
            }, function (err,todo) {
                if (err) throw err;
                res.send('Success');
            })
        }
        else {
            var newTodo = ToDos({
                username: req.body.username,
                todo: req.body.todo,
                isDone: req.body.isDone
            });
            newTodo.save(function (err) {
                res.send('Sucess')
            })
        }
    });

    app.post('/api/freight', function (req, res) {
        console.log(req);

        let newFreight = Freights({
            endPoints: req.body.endPoints,
            freight: req.body.freight,
            contact: req.body.contact,
            internalNote: req.body.internalNote
        });
        newFreight.save(function (err) {
            res.send("success")

        })
    });


    app.delete('/api/todo', function (req, res){
        ToDos.findByIdAndRemove(req.body.id, function (err) {
            if(err) throw err;
            res.send('Success');
        })
    })
};