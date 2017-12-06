var express = require('express');
var router = express.Router();

var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var logout = require('./routes/logout');

var isAuthenticated = function (req, res, next) {
    console.log("The current user is ");
    console.log(req.session.user);
	if (req.session.user) return next();
	res.redirect("/");
}

router.use('/', index);
router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);

module.exports=router;
