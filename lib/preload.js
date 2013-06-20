var setting = require('../ctrlers/setting'),
	config = require('../config/config');

// 为admin添加一些同步数据，只是为了测试需要
module.exports = function(app) {
	
	// 填入配置项
	setting.get(function(siteinfo) {
		// app.locals['site'] = siteinfo;
		app.locals['site'] = {
			name: 'for test'
		}
	});

	// 填入引擎信息
	config.system(function(systemInfo) {
		app.locals['system'] = systemInfo;
		console.log(app.locals['system']);
	});
}