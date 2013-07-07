/*
 * GET install page.
 */

var setting = require('../../ctrlers/setting'),
		group = require('../../ctrlers/group');

module.exports = function(req, res) {
	if(req.method == 'GET') {
		res.render('admin/install', {
			title: '安装系统'
		});
	} else if (req.method == 'POST') {
		var admin = req.body.admin,
				setting = req.body.setting;
		// 首先要新建admin用户组
		async.waterfall([
		  function(callback){
		  		group.create({
		  			name: 'admin',
		  			type: 'admin'
		  		},function(gid){
		  			callback(null,gid);
		  		})
		  },
		  function(gid, callback){
		  		user.create(admin,function(uid){
		  			callback(null,gid,uid)
		  		})
		  },
		  function(gid, uid, callback){
		  		user.put(uid,gid,function(stat){
		  			if (stat == 'ok') {
		  				callback(null,gid,uid);
		  			} else {
		  				console.log(stat);
		  			}
		  		})
		  }
		], function (err, result) {
			// 这个时候用户已经被加入到admin组了，至此只需要新建一个setting实例就可以了
			setting.install(setting,function(babyID){
				// 安装成功
				res.redirect('/admin');
			})
		});
	}
};