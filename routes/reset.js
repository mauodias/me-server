var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



/* GET home page. */
router.get('/', function(req, res, next) {
    mongoose.connect('mongodb://localhost/xablau/', function(){
        mongoose.connection.db.dropDatabase();
    });
    res.redirect('/');
});

module.exports = router;
