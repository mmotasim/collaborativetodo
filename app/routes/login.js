var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    if(req.session.user)
    {
        res.redirect('/profile');
        console.log(" the current user is "+req.session.user);
    }
    else
    {
        res.render('login', { title: 'Login Page',visible:0 });
    }
  
});
router.post('/',function(req,res,next)
{
    if(Object.keys(req.app.locals.users).includes(req.body.name))
    {
        req.session.user=req.body.name;
        res.redirect('/profile');
    }
    else
    {
         res.render('login', { title: 'Login Page',visible:1 });
    }
    
}
);
module.exports = router;
