var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./route.js')
var index = require('./routes/index');
var mongoose = require('mongoose')
var session = require('express-session')
var mongostore = require('connect-mongo')(session);
var app = express();

// requiring all models
var user_model = require("./models/user.js")





app.locals.checkuser = function(username,fn){
          user_model.find({username : username }, function(err,docs){
            var present;
            if(docs.length == 0)
              present = false
            else
              present = true
            fn(present)
          })
          
  }
  


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.connect('mongodb://motasim:SWAD2017@ds125716.mlab.com:25716/finalproject', { useMongoClient: true })
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Not so secret',
  resave: false,
  saveUninitialized: true,
  store : new mongostore({ mongooseConnection : mongoose.connection}),
  cookie: { maxAge : 180*60*1000}
}));
app.use(/ */,routes)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
