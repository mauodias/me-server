var mongoose = require('mongoose');

var PedidoSchema = new mongoose.Schema({
    Id: Number,
    ItemPedidos: [ {type: Number} ],
    IdComanda: Number,
    HoraCriacao: Date,
    Status: Number,
    HoraPronto: Date,
});

module.exports = mongoose.model('Pedido', PedidoSchema);
