var express = require('express');
var router = express.Router();

var Pedido = require('../models/Pedido.js')
var ItemPedido = require('../models/ItemPedido.js')
var Item = require('../models/Item.js')


/* GET /pedidos. */
router.get('/', function(req, res, next) {
    Pedido.find(function(err, items) {
        if (err) return next(err);
        res.json(items);
    }).select({"_id": 0, "__v": 0});
});

/* GET /pedidos/id */
router.get('/:id', function(req, res, next) {
    Pedido.findOne({
        Id: req.params.id
    }, function(err, item) {
        if (err) return next(err);
        console.log(item);
        var itempedidos;
        ItemPedido.find({
            Id: {$in: item.ItemPedidos}
        }, function(err, itens) {
            console.log(itens);
            itempedidos = itens;
        });
        item.ItemPedidos = itempedidos;
        res.json(item);
    }).select({"_id": 0, "__v": 0});
});

/* POST /pedidos/novo?{params} */
router.post('/novo', function(req, res, next) {
    Pedido.create({
        Id: req.query.id,
        ItemPedidos: req.query.items.split(','),
        IdComanda: req.query.idcomanda,
        HoraCriacao: Date.now(),
        Status: 0,
        HoraPronto: null
    }, function(err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

/* POST /pedidos/id?status={status} */
router.put('/:id', function(req, res, next) {
    Pedido.findOneAndUpdate({
        Id: req.params.id
    },
    {
        Status: req.query.status
    },
    function (err, item) {
        res.json(true);
    })
});

module.exports = router;
