var mongoose = require('mongoose')
var schema = mongoose.Schema

circleschema = new schema({
    name : String,
    members : [String]

})
module.exports = mongoose.model('circles',circleschema);