var mongoose = require('mongoose');

var ItemPedidoSchema = new mongoose.Schema({
    Id: Number,
    Item: String,
    Obs: String,
    Pedido: Number,
});

module.exports = mongoose.model('ItemPedido', ItemPedidoSchema);
