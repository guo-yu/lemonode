var fs = require('fs');

exports.system = function(cb) {
	fs.readFile('./package.json', function(err, data) {
		if(err) throw err;
		cb(JSON.parse(data));
	});
};