var express = require('express');
var router = express.Router();

var Comanda = require('../models/Comanda.js');
var Mesa = require('../models/Mesa.js');
var Pedido = require('../models/Pedido.js')

/* GET /comandas. */
router.get('/', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('comandas', 'GET /comandas');
    Comanda.find({}, function(err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

/* GET /comanda/id */
router.get('/:id', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('comandas', 'GET /comandas/' + req.params.Id);
    Pedido.find({
        IdComanda: req.params.id
    },function(err, items) {
        if (err) return next(err);
        res.json(items);
    });
});

router.post('/fechar', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('comandas', 'POST /comandas/fechar/' + req.body.Id);
    Comanda.findOne({
        Id: req.body.Id
    }, function(err, comanda){
        if (err) return next(err);
        comanda.Encerrada = true;
        comanda.DataFechamento = Date.now();
        comanda.save();
        Mesa.findOneAndUpdate({
            NumMesa: comanda.Mesa
        },{
            IsLivre: true
        },function(err, mesa){
            if (err) return next(err);
        });
        req.app.io.emit('gerente');
        res.json(comanda);
    });
});

module.exports = router;
