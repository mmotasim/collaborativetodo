var mongoose = require('mongoose')
var schema = mongoose.Schema

userschema = new schema({
    username : String,
    password : String,
    gender : String,
    groups : [schema.ObjectId],
    requests : [schema.ObjectId],
    to_do_list : schema.ObjectId

})
module.exports = mongoose.model('users',userschema);