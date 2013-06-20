/**
*
* ctrl: install
* @brief: 引导用户安装与创建站点信息
*
**/

var model = require('../models'),
	site = model.site,
	fs = require('fs');

exports.fetch = function(cb) {
	model.site.findOne({}, function(err,site) {
		if (!err) {
			if (site === null) {
				cb(false)
				// exports.redirect(req,res,next);
			} else {
				// next();
				cb(true)
			}
		} else {
			console.log(err);
		}
	});
};

exports._if = function(predict,cb) {
	exports.fetch(function(realstat){
		if (realstat == predict) {
			cb(true)
		} else {
			cb(false)
		}
	})
}

exports.uninstall = function(req,res,next) {
	// 如果没安装，进行下一步路由
	// 如果安装了，跳转去admin页面
	exports._if(false,function(stat){
		if (stat) {
			next()
		} else {
			res.redirect('/admin')
		}
	})
}

exports.install = function(req,res,next) {
	// 如果安装了，进行下一步路由
	// 没安装，跳转去安装界面
	exports._if(true,function(stat){
		if (stat) {
			next()
		} else {
			res.redirect('/install');
		}
	})
}