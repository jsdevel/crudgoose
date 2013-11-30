var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var claSchema = new Schema({
    quote:'string'
});

module.exports = mongoose.model('Cla',     claSchema);