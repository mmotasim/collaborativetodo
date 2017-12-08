var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var requests = require('../models/request.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/', function(req, res, next) {
    
        user = req.session.user;
    requests.find({sent_to : user}, async function(err,docs){
            reqs=[]
            for(var i =0;i<docs.length;i++)
            {
                var req = {}
                req.id = docs[i].id
                req.sent_by = docs[i].sent_by
                var cid = new mongoose.Types.ObjectId(docs[i].for_circle.toString())
                circle= await circles.findOne({_id:cid})
                req.circlename = circle.name
                console.log(req)
                reqs.push(req)
            }
            res.render('requests',{requests:reqs})
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
                console.log("Removing request")
                request.remove()
                res.send("0")
            }

        });

});

module.exports = router;
