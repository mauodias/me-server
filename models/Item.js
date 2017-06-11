var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var ItemSchema = new mongoose.Schema({
    Nome: String,
    Descricao: String,
    Ingredientes: [ {type: String} ],
    Preco: Number,
});

ItemSchema.plugin(autoIncrement.plugin, { model: 'Item', field: 'Id' });
module.exports = mongoose.model('Item', ItemSchema);
