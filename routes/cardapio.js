var express = require('express');
var router = express.Router();

var Item = require('../models/Item.js');

/* GET cardapio. */
router.get('/', function(req, res, next) {
    var logger = require('../app.js').logger;
    logger('cardapio', 'GET /cardapio');
    Item.find(function (err, items) {
      if (err) return next(err);
      res.json(items);
    });
});

/* GET /cardapio/id */
router.get('/:id', function(req, res, next) {
  Item.findOne({Id: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /cardapio/novo */
router.post('/novo', function(req, res, next) {
    Item.create({
        Nome: req.body.nome,
        Descricao: req.body.desc,
        Ingredientes: req.body.ingredientes.split(','),
        Preco: req.body.preco
    }, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
