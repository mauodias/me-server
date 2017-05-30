var mongoose = require('mongoose');

var ItemPedido = require('./ItemPedido.js');

var PedidoSchema = new mongoose.Schema({
    Id: Number,
    ItemPedidos: [ {type: ItemPedido} ],
    IdComanda: Number,
    HoraCriacao: Date,
    Status: Number,
    HoraPronto: Date,
});

module.exports = mongoose.model('Pedido', PedidoSchema);
