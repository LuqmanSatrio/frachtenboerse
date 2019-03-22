var express = require('express');
var app = express();
var monggoose = require('mongoose');
var config = require('./config');

var setupController = require('./controller/setupController');
var apiController = require('./controller/apiController');

var port = process.env.PORT || 3001;


monggoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

app.listen(port);