var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    Id: Number,
    Nome: String,
    Descricao: String,
    Ingredientes: [ {type: String} ],
    Preco: Number,
});

module.exports = mongoose.model('Item', ItemSchema);
