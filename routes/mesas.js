var express = require('express');
var router = express.Router();

var Mesa = require('../models/Mesa.js');

/* GET /mesa */
router.get('/', function(req, res, next) {
    Mesa.find(function(err, mesas) {
        if(err) return next(err);
        res.json(mesas);
    }).select({"_id": 0, "__v": 0});
});

router.get('/:num', function(req, res, next){
    Mesa.findOne({
        NumMesa: req.params.num
    }, function(err, mesa) {
        if (err) return next(err);
        res.json(mesa.IsLivre);
    }).select({"_id": 0, "__v": 0});
});

router.post('/:num', function(req, res, next){
    var status;
    Mesa.findOne({
        NumMesa: req.params.num
    }, function(err, mesa) {
        status = mesa.IsLivre;
        Mesa.findOneAndUpdate({
            NumMesa: req.params.num
        },{
            IsLivre: !status
        }, function(err, mesa){
            res.json(!status)
        });
    });
});

router.post('/criar/:id', function(req, res, next){
    Mesa.create({
        NumMesa: req.params.id,
        IsLivre: true
    }, function(err, mesa){
        if (err) return next(err);
        res.json(mesa)
    });
});

module.exports = router;
