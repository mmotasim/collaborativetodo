var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
var circles = require('../models/circle.js')
var mongoose = require('mongoose')
var schema = mongoose.Schema
/* GET home page. */
router.get('/',function(req,res,next){
    res.redirect('/profile/'+req.session.user)
})
router.get('/:username', function(req, res, next) {
    
    username = req.params.username;
    cur_user = req.session.user;
    var owner = false;
    if(cur_user == username)
    {
        owner = true;
    }
    users.findOne({username : username},function(err,user){
        res.render('profile',{user:user,owner:owner})
        
    })

  });


module.exports = router;
