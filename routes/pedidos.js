var express = require('express');
var router = express.Router();

var Pedido = require('../models/Pedido.js')
var ItemPedido = require('../models/ItemPedido.js')
var Item = require('../models/Item.js')


/* GET /pedidos. */
router.get('/', function(req, res, next) {
    console.log('GET /pedidos')
    Pedido.find(function(err, items) {
        if (err) return next(err);
        res.json(items);
    }).select({"_id": 0, "__v": 0});
});

/* GET /pedidos/id */
router.get('/:id', function(req, res, next) {
    console.log('GET /pedidos/' + req.params.id)
    Pedido.findOne({
        Id: req.params.id
    }, function(err, item) {
        if (err) return next(err);
        var itempedidos;
        ItemPedido.find({
            Id: {$in: item.ItemPedidos}
        }, function(err, itens) {
            itempedidos = itens;
        });
        item.ItemPedidos = itempedidos;
        res.json(item);
    }).select({"_id": 0, "__v": 0});
});

/* POST /pedidos/novo?{params} */
router.post('/novo', function(req, res, next) {
    /*var i_pedidos = [];
    req.body.ItemPedidos.split(';').forEach(function(item, index){
        i_pedidos.push(new ItemPedido({
            Item: JSON.parse(item).Item,
            Obs: JSON.parse(item).Obs
        }))
    });*/
    Pedido.create({
        Id: req.body.Id,
        ItemPedidos: [],
        IdComanda: req.body.IdComanda,
        HoraCriacao: Date.now(),
        Status: 0,
        HoraPronto: null
    }, function(err, item) {
        req.body.ItemPedidos.forEach(function(i_ped, index){
            item.ItemPedidos.push({Item: i_ped.Item, Obs: i_ped.Obs});
            item.save();
        });
        if (err) return next(err);
        res.json(item);
    });
});

/* POST /pedidos/id?status={status} */
router.put('/', function(req, res, next) {
    Pedido.findOneAndUpdate({
        Id: req.body.Id
    },
    {
        Status: req.body.Status
    },
    function (err, item) {
        res.json(true);
    })
});

module.exports = router;
