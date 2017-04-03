var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var index = require('./routes/index');
var uploads = require('./routes/uploads');


var app = express();

var mongoURI = "mongodb://localhost:27017/insect-collector"; // replace with your mongodb url

var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function (err) {
  if (err) {
    console.log('mongodb connection error', err);
  } else {
    console.log('mongodb connection successful');
  }
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up routes
app.use(express.static('public'));
app.use('/', index);
app.use('/uploads', uploads);


var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port: ', port);
});


module.exports = app;