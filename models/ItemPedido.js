var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var ItemPedidoSchema = new mongoose.Schema({
    Item: Number,
    Obs: String
});

ItemPedidoSchema.plugin(autoIncrement.plugin, { model: 'ItemPedido', field: 'Id' });
module.exports = mongoose.model('ItemPedido', ItemPedidoSchema);
