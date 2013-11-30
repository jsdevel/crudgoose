var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var blaSchema = new Schema({
    name:'string'
});

module.exports = mongoose.model('Bla',     blaSchema);