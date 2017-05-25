var mongoose = require('mongoose');

var ClienteSchema = new mongoose.Schema({
    Id: Number,
    Nome: String,
    IsLogged: Boolean,
});

module.exports = mongoose.model('Cliente', ClienteSchema);
