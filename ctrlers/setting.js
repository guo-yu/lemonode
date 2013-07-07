/**
*
* ctrler: 站点设置
*
**/

var model = require('../models'),
	fs = require('fs');

// 更新设置
exports.set = function(body,cb) {
	model.site.findOneAndUpdate({}, body, function(err) {
		if (!err) {
			cb(body);
		} else {
			console.log(err);
		}
	});
};

// 获取设置
exports.get = function(cb) {
	model.site.findOne({}).exec(function(err, siteinfo) {
		cb(siteinfo);
	});
};

// 第一次安装应用
exports.install = function(baby,cb) {
	var baby = new model.site(baby);
	baby.save(function(err){
		if (!err) {
			cb(baby._id)
		} else {
			console.log(err);
		}
	})
}