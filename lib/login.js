/**
 * @login
 * @brief: 判断用户是否登录有了sesion的中间层
 * @author [turingou]
 */
var model = require('../models'),
	user = model.user,
	md5 = require('md5');

exports.checker = function(req,res,next){
	if (req.session.user) {
		next()
	} else {
		res.redirect('/signin')
	}
}

exports.signin = function(req,res,next) {
  if (!req.session) {
	if (req.method == 'GET') {
		res.render('signin')
	} else if (req.method == 'POST') {
		user.findOne({
			name: req.body.name
		}).exec(function(err,ad){
			if (!err) {
				if (ad.password == md5(req.body.password)) {
					req.session.user = ad;
					res.redirect('back'); 
				} else {
					res.redirect('/signin?fail=password')
				}
			} else {
				console.log(err)
			}
		})
	}
  } else {
  	res.redirect('/')
  }
}

exports.signup = function(req,res,next) {
	if (req.method == 'GET') {
		res.render('signup')
	} else if (req.method == 'POST') {
		var baby = new user(req.body);
		baby.save(function(err){
			if(!err) {
				res.json({
					stat: ok,
					baby: baby._id;
				});
			} else {
				console.log(err)
			}
		})
	}
}

exports.signout = function(req,res,next) {
	delete req.session.user
	res.redirect('/')
}