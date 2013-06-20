/*
 * GET install page.
 */

var setting = require('../../ctrlers/setting');

module.exports = function(req, res) {
	if(req.method == 'GET') {
		res.render('admin/install', {
			title: '安装系统'
		});
	} else if (req.method == 'POST') {
		setting.install(req.body,function(babyID){
			// 安装成功
			res.redirect('/admin')
		})
	}
};