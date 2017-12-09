var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
/* GET signup page. */
router.get('/', function(req, res, next) {
    if(req.session.user)
    {
        res.redirect('/profile');
    }
    else
    {
        res.render('signup', { title: 'Sign Up Page', visible: 0 });
    }
  
});


router.post('/', function(req,res,next)
{
    req.app.locals.checkuser(req.body.name,function(present){

        if(present)
        {
            res.render('signup', { title: 'Sign Up Page', visible: 1});
        }
        else if(req.body.name == '' || req.body.password == '')
        {
            res.render('signup', { title: 'Sign Up Page', visible: 2});
        }
        else
        {
            user = {
                username : req.body.name,
                password : req.body.password,
                gender : "Male",
                groups : [],
                requests : [],
                to_do_list : []
                }
            users.create(user);
            req.session.user = user.username
            res.redirect('/profile');
        }

    });

    
});
module.exports = router;
