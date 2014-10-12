var express = require('express');
var app = express();

var express = require('express')
  , passport = require('passport')
  , util = require('util')

// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser')
// var session = require('express-session');
// var connect = require('connect')
// var methodOverride = require('method-override');
var path = require('path');

//var routes = require('./routes/index');
var request = require('request');

app.get('/', function(req, res){
  res.send('Hello World!');
});