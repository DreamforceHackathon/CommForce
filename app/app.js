var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var request = require('request');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.get('/fc/', function(req, res){
    
    var handle = req.query.handle;

    var qstring = 'https://api.fullcontact.com/v2/person.json?twitter='+handle+'&apiKey=a4b353a65c4863d0';


  //GET EVENTS ASSOCIATED WITH USER
  request(qstring, function (error, response, body) {
        
        console.log('Getting owned_events..');

        var eventsarray = [];

        console.log(error);
        //console.log(response)

        if (!error && response.statusCode == 200) {
          
          var eventsdata = JSON.parse(body);
          //cycle through events and add to array
          //eventsdata.events.forEach(addEventsToArray);
          console.log(eventsdata);

          res.send(eventsdata);



            // Set the headers
            var headers = {
                'User-Agent':       'Super Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }

            // Configure the request
            var options = {
                url: 'https://zapier.com/hooks/catch/ohfiy4/',
                method: 'POST',
                headers: headers,
                form: eventsdata
            }

            // Start the request
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // Print out the response body
                    console.log(body)
                }
            })
          //https://zapier.com/hooks/catch/ohfiy4/


          //call user profile data after getting events
          //finish();
        }
  });



    console.log(req.body);
    
  //res.send(req.body);
});


//app.use('/', routes);
app.use('/users', users);

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
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
