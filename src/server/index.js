var express = require('express'),
  app = express(),
  port = process.env.PORT || 9100,
  mongoose = require('mongoose'),
  Lang = require('../api/models/populangModel'), // Model
  bodyParser = require('body-parser');
  config = require('../../.config/config');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, config.options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('../api/routes/populangRoutes'); // Routes
routes(app); //register the route

// Handle non-existing routes
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('Populang RESTful API server started on: ' + port);
