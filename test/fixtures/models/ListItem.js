var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var listItemSchema = new Schema({
    listId: {
       type:ObjectId,
       required:true
    },
    date: {
       type:Date,
       required:true
    },
    name: {
       type:String,
       required:true
    },
    description: String,
    votes: [
        String
    ],
    comments: [
        ObjectId
    ]
}, {string:"throw"});

module.exports=mongoose.model('ListItem', listItemSchema);