const Freight = require("../models/freightModel");

module.exports = function (app) {

    app.get('/api/setUpFreight', function (req, res) {

        const newFreight = [
            {
                id: "12938",
                endPoints: [
                    {
                        address: {
                            street: "Neßdeich",
                            number: "152",
                            postcode: "21129",
                            city: "Hamburg",
                            country: "Germany"
                        },
                        loadingStation: "loadingStation",
                        date: new Date()
                    },
                    {
                        address: {
                            street: "Hellstraß3",
                            number: "152",
                            postcode: "212329",
                            city: "Hamburg",
                            country: "Germany"
                        },
                        loadingStation: "unloadingStation",
                        date: new Date()
                    }
                ],
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
                id: "12938",
                endPoints: [
                    {
                        address: {
                            street: "Neßdeich",
                            number: "152",
                            postcode: "21129",
                            city: "Hamburg",
                            country: "Germany"
                        },
                        loadingStation: "loadingStation",
                        date: new Date()
                    },
                    {
                        address: {
                            street: "Hellstraß3",
                            number: "152",
                            postcode: "212329",
                            city: "Hamburg",
                            country: "Germany"
                        },
                        loadingStation: "unloadingStation",
                        date: new Date()
                    }
                ],
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
        ];

        Freight.create(newFreight, function (err, results) {
            res.send(results)
        })
    })
};