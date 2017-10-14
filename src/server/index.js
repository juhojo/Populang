var express = require('express'),
  app = express(),
  port = process.env.PORT || 9100,
  mongoose = require('mongoose'),
  Lang = require('../api/models/populangModel'), // Model
  bodyParser = require('body-parser'),
  config = require('../../.config/config');

require('./scheduledjobs');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, config.options);

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var populangRoutes = require('../api/routes/populangRoutes'); // Collection Routes
var seRoutes = require('../api/routes/seRoutes'); // Stack Exchange Routes
 // Register the routes
populangRoutes(app);
seRoutes(app);

// Handle non-existing routes
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});
// Parameters are invalid
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


app.listen(port);

console.log('Populang RESTful API server started on: ' + port);
