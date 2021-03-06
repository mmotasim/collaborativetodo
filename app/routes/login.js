var express = require('express');
var router = express.Router();
var users = require('../models/user.js')
/* GET login page. */
router.get('/', function(req, res, next) {
    if(req.session.user)
    {
        res.redirect('/profile');
    }
    else
    {
        res.render('login', { title: 'Login Page',visible:0 });
    }
  
});
router.post('/',function(req,res,next)
{
    req.app.locals.checkuser(req.body.name,async function(present){
    
        if(present)
        {
            userdoc = await users.findOne({username:req.body.name});
            if( userdoc.password == req.body.password)
            {
                req.session.user = req.body.name
                res.redirect('/profile');
            }
            else
            {
                res.render('login', { title: 'Login Page',visible:2 });
            }
            
        }
        else
        {
            res.render('login', { title: 'Login Page',visible:1 });
        }
    })
}
);
module.exports = router;
