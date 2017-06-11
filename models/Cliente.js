var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var ClienteSchema = new mongoose.Schema({
    Nome: String,
    IsLogged: Boolean,
});

ClienteSchema.plugin(autoIncrement.plugin, { model: 'Cliente', field: 'Id' });
module.exports = mongoose.model('Cliente', ClienteSchema);
