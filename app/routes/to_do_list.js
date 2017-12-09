var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/', function(req, res, next) {
    
        user = req.session.user;
        users.findOne({username : user}, function(err,user_doc){
            items = user_doc.to_do_list
            res.render('to_do_list',items)
        })
              
});


router.post('/',function(req,res,next){
        reqid = req.body.reqid
        user = req.session.user
        var rid = new mongoose.Types.ObjectId(reqid.toString());
        requests.findOne({_id:rid},async function(err,request){
            if(req.body.accept == 1)
            {
                var cid = new mongoose.Types.ObjectId(request.for_circle.toString())
                circle = await circles.findOne({_id:cid})
                user_doc = await users.findOne({username:request.sent_to})
                circle.members.push(user_doc.username)
                circle.save()
                user_doc.groups.push(circle._id)
                user_doc.save()
                request.remove()
                res.send("1")
            }
            else
            {
                request.remove()
                res.send("0")
            }

        });

});

module.exports = router;
