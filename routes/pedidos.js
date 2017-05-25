var express = require('express');
var router = express.Router();

var Pedido = require('../models/Pedido.js')

/* GET /pedidos. */
router.get('/', function(req, res, next) {
    Pedido.find(function(err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

/* GET /pedidos/id */
router.get('/:id', function(req, res, next) {
    Pedido.find({
        Id: req.params.id
    }, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /pedidos/novo?params */
router.post('/novo', function(req, res, next) {
    console.log(req.query);
    Pedido.create({
        Id: req.query.id,
        ItemPedidos: req.query.items.split(','),
        IdComanda: req.query.idcomanda,
        HoraCriacao: Date.now(),
        Status: 0,
        HoraPronto: null
    }, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
