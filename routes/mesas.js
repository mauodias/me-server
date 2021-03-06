var express = require('express');
var router = express.Router();

var Mesa = require('../models/Mesa.js');
var Comanda = require('../models/Comanda.js');

/* GET /mesa */
router.get('/', function(req, res, next) {
    Mesa.find(function(err, mesas) {
        if(err) return next(err);
        res.json(mesas);
    });
});

router.get('/:num', function(req, res, next){
    Mesa.findOne({
        NumMesa: req.params.num
    }, function(err, mesa) {
        if (err) return next(err);
        res.json(mesa.IsLivre);
    });
});

router.post('/', function(req, res, next){
    var result;
    Mesa.findOne({
        NumMesa: req.body.NumMesa
    }, function(err, mesa) {
        if (mesa.IsLivre) {
            Mesa.findOneAndUpdate({
                NumMesa: req.body.NumMesa
            },{
                IsLivre: false
            }, function(err, mesa){
                Comanda.create({
                    IdCliente: 0,
                    Mesa: req.body.NumMesa,
                    Encerrada: false,
                    Pedidos: [],
                    DataEntrada: Date.now(),
                    DataFechamento: null
                }, function(err, comanda) {
                    if (err) return next(err);
                    res.json(comanda);
                });
            });
            req.app.io.emit('gerente');
        }
        else {
            res.json(false);
        }

    });
});

router.post('/fechar', function(req, res, next){;
    Mesa.findOne({
        NumMesa: req.body.NumMesa
    }, function(err, mesa) {
        if (!mesa.IsLivre) {
            Mesa.findOneAndUpdate({
                NumMesa: req.body.NumMesa
            },{
                IsLivre: true
            }, function(err, mesa){
                if (err) return next(err);
                Comanda.findOne({
                    Mesa: req.body.NumMesa,
                    Encerrada: false
                }, function(err, comanda) {
                    if (err) return next(err);
                    comanda.Encerrada = true;
                    comanda.DataFechamento = Date.now();
                    comanda.save();
                    res.json(comanda);
                });
            });
            req.app.io.emit('gerente');
        }
        else {
            res.json(false);
        }

    });
});

router.post('/liberar', function(req, res, next){
    Mesa.findOne({
        NumMesa: req.body.NumMesa
    }, function(err, mesa){
        if (!mesa.IsLivre) {
            Mesa.findOneAndUpdate({
                NumMesa: req.body.NumMesa
            }, {
                IsLivre: true
            }, function (err, mesa) {
                if (err) return next (err);
                res.json(true);
            });
        } else {
            res.json(false);
        }
    });
});

router.post('/criar/:id', function(req, res, next){
    Mesa.create({
        NumMesa: req.params.id,
        IsLivre: true
    }, function(err, mesa) {
        if (err) return next(err);
            res.json(mesa)
    });
});

module.exports = router;
