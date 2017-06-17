require('dotenv').load();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon')

var routes = require('./routes/index');
var cardapio = require('./routes/cardapio');
var pedidos = require('./routes/pedidos');
var mesas = require('./routes/mesas');
var reset = require('./routes/reset')

// load mongoose package
var mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/cardapio', cardapio);
app.use('/pedidos', pedidos);
app.use('/mesas', mesas);
app.use('/reset', reset);
//app.use('/comandas', comandas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
