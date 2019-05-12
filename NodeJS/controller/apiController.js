let ToDos = require('../models/toDoModel');
let Freights = require('../models/freightModel');
var bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: true}));


    app.get('/api/freight/', function (req, res) {

        const vehicle = {
            "vehicleType": req.query.neededVehicle.vehicleType,
            "weight": parseInt(req.query.neededVehicle.weight),
            "length": parseInt(req.query.neededVehicle.length),
            "additionalEquipment": req.query.neededVehicle.additionalEquipment
        };

        Freights.find({
                "neededVehicle": vehicle,
                "startingPoint.address.city": req.query.startingPoint.address.city,
                "startingPoint.address.country": req.query.startingPoint.address.country,
                "startingPoint.address.postcode": req.query.startingPoint.address.postcode,
                "startingPoint.date": parseInt(req.query.startingPoint.date),
                "endPoint.address.city": req.query.endPoint.address.city,
                "endPoint.address.country": req.query.endPoint.address.country,
                "endPoint.address.postcode": req.query.endPoint.address.postcode,
                "endPoint.date": parseInt(req.query.endPoint.date)
            }
            , function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                    res.send(result)

                }
            });
    });

    app.post('/api/freight', function (req, res) {

        console.log(req.body)

        let newFreight = Freights({
            startingPoint: req.body.startingPoint,
            pointsBetween: req.body.pointsBetween,
            endPoint: req.body.endPoint,
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