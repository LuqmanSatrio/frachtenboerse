let ToDos = require('../models/toDoModel');
let Freights = require('../models/freightModel');
var bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: true}));


    app.get('/api/freight/', function (req, res) {

        Freights.find({
           
        }, function (err, todo) {
            if (err) {
                alert(err)
            } else {
                res.send(todo)
            }
        });
    });

    app.post('/api/freight', function (req, res) {

        let newFreight = Freights({
            endPoints: req.body.endPoints,
            freight: req.body.freight,
            neededVehicle: req.body.neededVehicle,
            contact: req.body.contact,
            internalNote: req.body.internalNote
        });
        newFreight.save(function (err) {
            err ? console.log(err) : res.send("success")
        })
    });


    app.delete('/api/todo', function (req, res) {
        ToDos.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;
            res.send('Success');
        })
    })
};