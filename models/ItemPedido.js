var mongoose = require('mongoose');

var ItemPedidoSchema = new mongoose.Schema({
    Id: Number,
    Item: Number,
    Obs: String
});

module.exports = mongoose.model('ItemPedido', ItemPedidoSchema);
