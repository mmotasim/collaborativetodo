var express = require('express');
var router = express.Router();

var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var logout = require('./routes/logout');
var circles = require('./routes/circles')
var circle = require('./routes/circle')
var members = require('./routes/members')
var profile = require('./routes/profile')
var addmember = require('./routes/addmember')
var requests = require('./routes/requests')
var to_do_list = require('./routes/to_do_list')
var additem = require('./routes/additem')
var alteritem = require('./routes/alteritem')
var ranking = require('./routes/ranking')

var isAuthenticated = function (req, res, next) {
    if(!req.xhr)
    {
        if (req.session.user) return next();
        res.redirect("/");
    }

    else
    {
        if (req.session.user) return next();
        res.redirect("/");
    }
	
}

router.use('/', index);
router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/circles',isAuthenticated,circles)
router.use('/circle',isAuthenticated,circle)
router.use('/members',isAuthenticated,members)
router.use('/profile',isAuthenticated,profile)
router.use('/addmember',isAuthenticated,addmember)
router.use('/requests',isAuthenticated,requests)
router.use('/to_do_list',isAuthenticated,to_do_list)
router.use('/additem',isAuthenticated,additem)
router.use('/alteritem',isAuthenticated,alteritem)
router.use('/ranking',isAuthenticated,ranking)
module.exports=router;
