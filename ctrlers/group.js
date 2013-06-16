var model = require('../models'),
	user = model.user,
	group = model.group,
	userCtrl = require('./user'),
	async = require('async');

// 新建一个用户组
exports.create = function(baby, cb) {
	var baby = new group(baby);
	baby.save(function(err) {
		if(!err) {
			cb(baby._id);
		}
	});
}

// 更新用户组信息
exports.update = function(id, body, cb) {
	group.findByIdAndUpdate(id, body, function(err) {
		if(!err) {
			cb(id)
		}
	})
}

// 删除一个用户组，但不删除其中的用户
// 需要考虑删除一个用户组之后，保留在那些被加入的用户索引当中的记录，将这些用户移入到默认组或者清空他们的组
// 这部分的功能还没写完呢。。。先睡觉。。
exports.remove = function(id, cb) {

	async.waterfall([

	function(callback) {
		// 找出这些组的用户
		user.find({
			group: id
		}).exec(function(err, users) {
			if(!err) {
				if(users.length > 0) {
					// 存在这些用户
					callback(null, users)
				} else {
					cb('ok')
				}
			}
		})
	}, function(users, callback) {
		// 批量将这些用户移到默认的组
		group.findByIdAndRemove(id, function(err) {
			cb(id);
		});
		if(typeof(user) == 'array') {
			// userCtrl()
		}
	}, ]);
}