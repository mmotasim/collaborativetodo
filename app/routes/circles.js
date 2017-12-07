var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/', function(req, res, next) {
    
        user = req.session.user;
        
        users.findOne({username : user}, async function(err,user){
            circs = []
            console.log(user.groups)
            for(var i = 0; i<user.groups.length;i++)
            {
                circle_id = user.groups[i]
                console.log("THe only group is "+circle_id.toString())
                //console.log(typeof(circle_id.toString()))
                var oid = new mongoose.Types.ObjectId(circle_id.toString());
                circle = await  circles.findOne({_id:oid})
                circs.push(circle)
        
            }
            console.log(circs)
            res.render('circles',{circles : circs})
        })
              
});

router.post('/',function(req,res,next){
     var cir = new circles()
        cir.name = req.body.circlename
        cir.members = [req.session.user]
        user = req.session.user
        users.findOne({username : user},function(err,user){
            cir.save(function(err,circle){
                console.log("circle id is of the type : "+schema.ObjectId(circle._id))
                user.groups.push(circle._id)
                user.save(function(err,upuser){
                    console.log("The groups of updated user")
                    console.log(upuser.groups)
                })
                
            })
        })
        

        res.send({})

});

module.exports = router;
