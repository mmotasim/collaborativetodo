var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
    console.log("In Signup.  The current user is ");
    console.log(req.session.user);
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
    if(Object.keys(req.app.locals.users).includes(req.body.name1))
    {
        res.render('signup', { title: 'Sign Up Page', visible: 1});
    }
    else
    {
       var username=req.body.name1;
       var user={};
       user.name="";
       user.age=0;
       req.app.locals.users[username]=user;
       req.session.user=username;
       res.redirect('/profile');
    }
});
module.exports = router;
