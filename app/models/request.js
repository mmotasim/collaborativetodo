var mongoose = require('mongoose')
var schema = mongoose.Schema

requestschema = new schema({
    sent_to : String,
    sent_by : String,
    for_circle : schema.ObjectId

})
module.exports = mongoose.model('request',requestschema);