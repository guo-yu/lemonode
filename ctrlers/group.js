var model = require('../models'),
	user = model.user,
	group = model.group,
	userCtrl = require('./user'),
	async = require('async'),
	_ = require('underscore');

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
// 而是将这些用户移入默认的组里（能找到的第一个组里）
exports.remove = function(id, cb) {
	async.waterfall([
	  function(callback){
	  		user.find({
	  			group: id
	  		}).exec(function(err,users){
	  			if (!err) {
	  				console.log(users);
	  				if (users != null) {
	  					// 存在一些用户在这个组里
	  					callback(null,users);
	  				}
	  			} else {
	  				console.log(err)
	  			}
	  		})
	  },
	  function(users ,callback){
	  		// 寻找默认组的id;
	  		group.findOne({}).exec(function(err,g){
	  			if (!err) {
	  				callback(null,users,g._id);
	  			} else {
	  				console.log(err);
	  			}
	  		})
	  },
	  function(users,gid, callback){
	  		_.each(users,function(u){
	  			u.group = gid;
	  			u.save(function(err){
	  				if (!err) {
	  					callback(null,gid)
	  				} else {
	  					console.log(err)
	  				}
	  			})
	  		})
	  },
	  function(gid,callback) {
	  	 // 最后删除这个用户组
	  	 group.findByIdAndRemove(id,function(err){
	  	 	if (!err) {
	  	 		cb(id);
	  	 	}
	  	 })
	  }
	]);
}