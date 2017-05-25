var express = require('express');
var router = express.Router();

var Item = require('../models/Item.js')

/* GET cardapio. */
router.get('/', function(req, res, next) {
    Item.find(function (err, items) {
      if (err) return next(err);
      res.json(items);
    });
});

/* GET /cardapio/id */
router.get('/:id', function(req, res, next) {
  Item.find({Id: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /cardapio/novo */
router.post('/novo', function(req, res, next) {
    console.log(req.query);
    Item.create({
        Id: req.query.id,
        Nome: req.query.nome,
        Descricao: req.query.desc,
        Ingredientes: req.query.ingredientes.split(','),
        Preco: req.query.preco
    }, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
