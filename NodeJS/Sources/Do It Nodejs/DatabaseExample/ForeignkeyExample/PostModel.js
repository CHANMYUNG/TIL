let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = Schema({
    _id : {type:Number},
    _publisher : {type : Number, ref : 'user'},
    title : {type : String},
    content : {type : String}
});


module.exports = mongoose.model("post", schema);