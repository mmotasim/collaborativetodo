var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/:circle_id', function(req, res, next) {
    console.log('I am in members')
    circle_id = req.params.circle_id;
    cur_user = req.session.user;
    var oid = new mongoose.Types.ObjectId(circle_id.toString());
    circles.findOne({_id:oid},async function(err,circle){
        if(circle.members.includes(req.session.user))
        {
            mems=[]
            console.log(circle.members)
            for(var i=0;i<circle.members.length;i++)
            {
                member = circle.members[i]
                member_doc = await users.findOne({username : member})
                mems.push(member_doc)
            }
            res.render('members',{members:mems})
        }
        else
        {
            res.send("You cannot view this page")
        }
        
    })

  });


module.exports = router;
