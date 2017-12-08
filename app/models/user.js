var mongoose = require('mongoose')
var schema = mongoose.Schema

item = new schema({
    description : String,
    privacy : String,
    status : String
})


userschema = new schema({
    username : String,
    password : String,
    gender : String,
    groups : [schema.ObjectId],
    requests : [schema.ObjectId],
    to_do_list : [item]

})
module.exports = mongoose.model('users',userschema);