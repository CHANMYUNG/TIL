let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = Schema({
    _id : {type : Number},
    posts : [{type : Schema.Types.ObjectId, ref : 'post'}]
});


module.exports = mongoose.model("user", schema);
