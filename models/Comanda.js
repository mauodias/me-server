var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Pedido = require('./Pedido.js')
autoIncrement.initialize(mongoose.connection);

var ComandaSchema = new mongoose.Schema({
    IdCliente: Number,
    Mesa: Number,
    Encerrada: Boolean,
    Pedidos: [{type: Pedido.schema}],
    DataEntrada: Date,
    DataFechamento: Date,
});

ComandaSchema.plugin(autoIncrement.plugin, { model: 'Comanda', field: 'Id' });
module.exports = mongoose.model('Comanda', ComandaSchema);
