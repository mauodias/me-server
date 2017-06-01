var mongoose = require('mongoose');

var ComandaSchema = new mongoose.Schema({
    Id: Number,
    IdCliente: Number,
    Mesa: Number,
    Encerrada: Boolean,
    Pedidos: [{type: Number}],
    DataEntrada: Date,
    DataFechamento: Date,
});

module.exports = mongoose.model('Comanda', ComandaSchema);
