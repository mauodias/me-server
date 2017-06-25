var express = require('express');
var router = express.Router();

var Comanda = require('../models/Comanda.js');
var Pedido = require('../models/Pedido.js')

/* GET /comandas. */
router.get('/', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('comandas', 'GET /comanda/' + req.params.Id);
    Comanda.find({}, function(err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

/* GET /comanda/id */
router.get('/:id', function(req, res, next) {
    console.log('GET /comanda/' + req.params.id)
    Pedido.find({
        IdComanda: req.params.id
    },function(err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

module.exports = router;
