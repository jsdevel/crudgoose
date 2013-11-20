var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
    date: {
       type:Date,
       required:true
    },
    item: {
       type:ObjectId,
       required:true
    },
    user: {
       type:String,
       required:true
    },
    body: {
       type:String,
       required:true
    },
    votes: [
        String
    ]
}, {string:"throw"});

module.exports = mongoose.model('Comment',  commentSchema);