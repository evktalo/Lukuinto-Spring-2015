'use strict';
var express = require('express');
var pg = require('pg');
var app = express();

var env = process.env.NODE_ENV || 'development';

//Static files for client
app.use(express.static('client/'));

 // Setup view engine for server side templating
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// Setup path where all server templates will reside
app.set('views', 'server/templates');

if (env === 'development') {
  app.use(express.static('dist/client/'));
} else {
  app.use(express.static('client/'));
}

require('./server/routes/routes')(app);

//Creates database client and connect it to the database.
//If our table doesn't exist then it is created.
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) {
    console.log(err);
  }
  client.query('CREATE TABLE IF NOT EXISTS Files(id SERIAL PRIMARY KEY, filename VARCHAR(64) NOT NULL, filesize INT NOT NULL, data BYTEA NOT NULL, created TIMESTAMP DEFAULT current_timestamp NOT NULL)');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      status: err.status,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var portNumber = process.env.PORT || 3000;
var server = app.listen(portNumber, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
