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