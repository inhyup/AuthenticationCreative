var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
var io = require('socket.io')(http);
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/myapp', { useMongoClient: true });

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge:2628000000},
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
      mongooseConnection:mongoose.connection
    })
  }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
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


app.get("/",function(req, res){
    res.sendfile("client.html");
  });
  
  var count=1;
  io.on('connection', function(socket){
    console.log('user connected: ', socket.id);
    var name = "user" + count++;
    io.to(socket.id).emit('change name',name);
  
    socket.on('disconnect', function(){
      console.log('user disconnected: ', socket.id);
    });
    
    socket.on('send message', function(name,text){
      var msg = name + ' : ' + text;
      console.log(msg);
      io.emit('receive message', msg);
    });
  });

module.exports = app;