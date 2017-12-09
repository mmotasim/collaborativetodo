var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var request = require('../models/request.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.post('/', function(req, res, next) {
    new_user = req.body.newuser;
    circle = req.body.circle;
    cur_user = req.session.user;
    users.findOne({username:new_user},async function(err,user){
        if(user)
        {
            var oid = new mongoose.Types.ObjectId(circle.toString())
            circle = await circles.findOne({_id:oid})
            if(circle.members.includes(new_user))
            {
                res.send("0")
                res.end()
            }
            else
            {
                old_req = await request.findOne({$and:[{sent_to:new_user},{for_circle:circle._id}]})
                if(old_req)
                {
                    res.send("-2")
                    res.end()
                }
                else{
                    var requ = new request()
                    requ.sent_to = new_user
                    requ.sent_by = cur_user
                    requ.for_circle = circle._id
                    requ.save()
                    res.send("1")
                    res.end()
                }
                
            }
        }
        else
        {
            res.send('-1')
            res.end()
        }
    })

  });


  
module.exports = router;
