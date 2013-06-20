module.exports = function(app) {
	// 填入配置项
	require('../ctrlers/setting').get(function(siteinfo) {
		// app.locals['site'] = siteinfo;
		app.locals['site'] = {
			name: 'for test'
		}
	});

	// 填入引擎信息
	require('../config/config').system(function(systemInfo) {
		app.locals['system'] = systemInfo;
		console.log(app.locals['system']);
	});
}