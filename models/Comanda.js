var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var ComandaSchema = new mongoose.Schema({
    IdCliente: Number,
    Mesa: Number,
    Encerrada: Boolean,
    Pedidos: [{type: Number}],
    DataEntrada: Date,
    DataFechamento: Date,
});

ComandaSchema.plugin(autoIncrement.plugin, { model: 'Comanda', field: 'Id' });
module.exports = mongoose.model('Comanda', ComandaSchema);
