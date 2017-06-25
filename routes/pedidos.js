var express = require('express');
var router = express.Router();

var Pedido = require('../models/Pedido.js')
var ItemPedido = require('../models/ItemPedido.js')
var Comanda = require('../models/Comanda.js');
var Item = require('../models/Item.js')


/* GET /pedidos. */
router.get('/', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('pedidos', 'GET /pedidos/');
    Pedido.find({
        Status: {$ne: 2}
    },function(err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

/* GET /pedidos/id */
router.get('/:id', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('pedidos', 'GET /pedidos/' + req.params.id);
    Pedido.findOne({
        Id: req.params.id
    }, function(err, item) {
        if (err) return next(err);
        res.json(item);
    });
});

router.get('/delete/:id', function(req, res, next){
    var logger = require('../app.js').logger;
    logger('pedidos', 'GET /pedidos/deleteall');
    Pedido.remove({
        Id: req.params.id
    }, function(err, removed){
        logger('pedidos', 'Pedido ' + req.params.Id + ' removido.');
    });
    res.json(true);
});

/* POST /pedidos/novo?{params} */
router.post('/novo', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('pedidos', 'GET /pedidos/novo');
    Pedido.create({new: true}, {
        ItemPedidos: [],
        IdComanda: req.body.IdComanda,
        HoraCriacao: Date.now(),
        Status: 0,
        HoraPronto: null
    }, function(err, pedido) {
        if (err) return next(err);

        var itemped = req.body.ItemPedidos;
        itemped.forEach(function(each, index){
            pedido.ItemPedidos.push({Item: each.Item, Obs: each.Obs});
        });
        pedido.save();

        Comanda.findOne({
            Id: req.body.IdComanda
        }, function(err, comanda){
            if (err) return next(err);
            comanda.ItemPedidos.push(pedido);
            comanda.save();
        });

        req.app.io.emit('cozinha');
        res.json(pedido);
    });
});

/* PUT /pedidos/id?status={status} */
router.put('/', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger(
        'pedidos',
        'PUT /pedidos/?Id=' + req.body.Id
               + '&Status=' + req.body.Status);
    Pedido.findOneAndUpdate({
        Id: req.body.Id
    },
    {
        Status: req.body.Status
    },
    function (err, item) {
        res.json(item);
    })
});

module.exports = router;
