var model = require('./models'),
	fs = require('fs');

exports.set = function(key, value) {
	model.site.findOne({}).exec(function(err, siteinfo) {
		if(key && value) {
			siteinfo[key] = value;
			siteinfo.save();
		}
	})
};

exports.get = function(cb) {
	model.site.findOne({}).exec(function(err, siteinfo) {
		cb(siteinfo);
	});
};