var mongoose = require('mongoose');

var MesaSchema = new mongoose.Schema({
    NumMesa: Number,
    IsLivre: Boolean,
});

module.exports = mongoose.model('Mesa', MesaSchema);
