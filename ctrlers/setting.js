/**
*
* ctrler: 站点设置
*
**/


var model = require('../models'),
	fs = require('fs');

exports.set = function(body,cb) {
	model.site.findOneAndUpdate({}, body, function(err) {
		if (!err) {
			cb(body);
		} else {
			console.log(err);
		}
	});
};

exports.get = function(cb) {
	model.site.findOne({}).exec(function(err, siteinfo) {
		cb(siteinfo);
	});
};

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