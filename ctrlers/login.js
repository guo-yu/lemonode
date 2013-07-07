/**
 * @login
 * @brief: 判断用户是否登录有了sesion的中间层
 * @author [turingou]
 */
var model = require('../models'),
		admin = model.admin,
		md5 = require('../lib/md5');

exports.checker = function(req,res,next){
	if (req.session.user) {
		next()
	} else {
		res.redirect('/signin')
	}
}

exports.signin = function(req,res,next) {
  if (!req.session.user) {
	if (req.method == 'GET') {
		res.render('signin')
	} else if (req.method == 'POST') {
		// 此出调用相关的ctrler
	}
  } else {
  	res.redirect('/')
  }
}

exports.signup = function(req,res,next) {
	if (req.method == 'GET') {
		res.render('signup')
	} else if (req.method == 'POST') {
		// 此处调用相应的ctrler
		req.body.password = md5(req.body.password);
		var baby = new admin(req.body);
		baby.save(function(err){
			if(!err) {
				res.redirect('/signin');
			} else {
				console.log(err)
			}
		})
	}
}

exports.signout = function(req,res,next) {
	delete req.session.user;
	res.redirect('/')
}