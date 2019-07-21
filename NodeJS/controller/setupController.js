const Freight = require("../models/freightModel");
const Tour = require("../models/tourModel");

module.exports = function (app) {

    app.get('/api/setUpTour', function (req, res) {

        const newTour = [
            {
                startingPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "21129",
                        city: "Paris",
                        country: "Frankreich"
                    },
                    loadingStation: "loadingStation",
                    date: new Date()
                },
                endPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "1900",
                        city: "Wien",
                        country: "Österreich"
                    },
                    loadingStation: "loadingStation",
                    date: new Date()
                },
                vehicle:
                    {
                        vehicleType: "Sattelzug",
                        weight: 10,
                        length: 10,
                        additionalEquipment: ["gps", "hydraulicRamp"],
                    }
            }, {
                startingPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "21129",
                        city: "Hamburg",
                        country: "Deutschland"
                    },
                    loadingStation: "loadingStation",
                    date: new Date()
                },
                endPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "1900",
                        city: "Hungary",
                        country: "Budapest"
                    },
                    vehicle:
                        {
                            vehicleType: "Sattelzug",
                            weight: 10,
                            length: 10,
                            additionalEquipment: ["gps", "hydraulicRamp"],
                        }
                }
            }
        ];

        Tour.create(newTour, function (err, results) {
            res.send(results)
        })
    });

    app.get('/api/setUpFreight', function (req, res) {

        const newFreight = [
            {
                startingPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "21129",
                        city: "Paris",
                        country: "Frankreich"
                    },
                    loadingStation: "loadingStation",
                    date: new Date()
                },
                pointsBetween: [
                    {
                        address: {
                            street: "Neßdeich",
                            number: "152",
                            postcode: "1010",
                            city: "Rom",
                            country: "Italien"
                        },
                        loadingStation: "loadingStation",
                        date: new Date()
                    }
                ],
                endPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "1900",
                        city: "Wien",
                        country: "Österreich"
                    },
                    loadingStation: "loadingStation",
                    date: new Date()
                },
                freight: {
                    widthInMeter: 20,
                    weightInTon: 10,
                    freightType: "Gefahrgut",
                    price: 600
                },
                neededVehicle:
                    {
                        vehicleType: "Sattelzug",
                        weight: 10,
                        length: 10,
                        additionalEquipment: ["Gps", "Zange"],
                    }
            }, {
                startingPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "21129",
                        city: "Hamburg",
                        country: "Deutschland"
                    },
                    loadingStation: "loadingStation",
                    date: new Date()
                },
                pointsBetween: [
                    {
                        address: {
                            street: "Neßdeich",
                            number: "152",
                            postcode: "1010",
                            city: "Wien",
                            country: "Österreich"
                        },
                        loadingStation: "loadingStation",
                        date: new Date()
                    },
                    {
                        address: {
                            street: "Hellstraß3",
                            number: "152",
                            postcode: "81103",
                            city: "Bratislava",
                            country: "Slowakai"
                        },
                        loadingStation: "unloadingStation",
                        date: new Date()
                    }
                ],
                endPoint: {
                    address: {
                        street: "Neßdeich",
                        number: "152",
                        postcode: "1900",
                        city: "Hungary",
                        country: "Budapest"
                    },
                    freight: {
                        widthInMeter: 20,
                        weightInTon: 10,
                        freightType: "Gefahrgut",
                        price: 600
                    },
                    neededVehicle:
                        {
                            vehicleType: "Sattelzug",
                            weight: 10,
                            length: 10,
                            additionalEquipment: ["Gps", "Zange"],
                        }
                }
            }
        ];

        Freight.create(newFreight, function (err, results) {
            res.send(results)
        })
    })
};