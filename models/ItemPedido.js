var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var Item = require('./Item.js')

var ItemPedidoSchema = new mongoose.Schema({
    Item: Item.schema,
    Obs: String,
    Status: {type: Boolean, default: false}
});

ItemPedidoSchema.plugin(autoIncrement.plugin, { model: 'ItemPedido', field: 'Id' });
module.exports = mongoose.model('ItemPedido', ItemPedidoSchema);
