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
    });
});

/* GET /pedidos/id */
router.get('/:id', function(req, res, next) {
    console.log('GET /pedidos/' + req.params.id)
    Pedido.findOne({
        Id: req.params.id
    }, function(err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

/* POST /pedidos/novo?{params} */
router.post('/novo', function(req, res, next) {
    console.log('POST /pedidos/novo');
    console.log(' - BODY: ' + JSON.stringify(req.body));
    Pedido.create({
        Id: req.body.Id,
        ItemPedidos: [],
        IdComanda: req.body.IdComanda,
        HoraCriacao: Date.now(),
        Status: 0,
        HoraPronto: null
    }, function(err, pedido) {
        var itemped = JSON.parse(req.body.ItemPedidos);
        itemped.forEach(function(each, index){
            Item.findOne({
                Id: each.Item
            }, function(err, item){
                pedido.ItemPedidos.push({Item: item, Obs: each.Obs});
                pedido.save();
            });
        });
        if (err) return next(err);
        res.json(pedido);
    });
});

/* POST /pedidos/id?status={status} */
router.put('/', function(req, res, next) {
    console.log('PUT /pedidos');
    console.log(' - BODY: ' + JSON.stringify(req.body));
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
