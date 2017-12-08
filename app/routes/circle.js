var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/:circle_id', function(req, res, next) {
    circle_id = req.params.circle_id;
    cur_user = req.session.user;
    var oid = new mongoose.Types.ObjectId(circle_id.toString());
    circles.findOne({_id:oid},function(err,circle){
        console.log(circle.members)
        if(circle.members.includes(cur_user))
        {
            res.render('circle',{circlename:circle.name})
        }
        else
        {
            res.send("You are not part of this group")
        }
    })

  });


module.exports = router;
