var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var ItemPedido = require('./ItemPedido.js');

var PedidoSchema = new mongoose.Schema({
    ItemPedidos: [ItemPedido.schema],
    IdComanda: Number,
    HoraCriacao: Date,
    Status: Number,
    HoraPronto: Date,
});

PedidoSchema.plugin(autoIncrement.plugin, { model: 'Pedido', field: 'Id' });
module.exports = mongoose.model('Pedido', PedidoSchema);
