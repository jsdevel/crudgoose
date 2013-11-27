var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var listSchema = new Schema({
    date: {
        type:Date,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    //it's implied that a user can add anybody to a list they belong to
    users: {
        type:[String],
        required:true
    },
    description: String,
    pendingUsers: {
        type:[String]
    },
    items: {
        type:[ObjectId]
    }
}, {string:"throw"});

module.exports = mongoose.model('List',     listSchema);