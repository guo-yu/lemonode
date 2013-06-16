var model = require('../models'),
	user = model.user,
	group = model.group;

// 新建一个用户
exports.create = function(baby,cb) {
	var baby = new user(baby);
	baby.save(function(err){
		if (!err) {
			cb(baby._id);
		}
	});
}

// 更新用户信息
exports.update = function(id,body,cb) {
	user.findByIdAndUpdate(id,body,function(err){
		if (!err) {
			cb(id)
		}
	})
}

// 删除一个用户
exports.remove = function(id) {
	// 删除完这个用户之后，要联动删除在用户组里的记录才行
	user.findByIdAndRemove(id,function(err){
		cb(id)
	});
}

// 将某个用户移动到一个组里
exports.put = function(userid,groupid,cb) {
	// 先判断这个组里是否已经有了这个用户
	async.waterfall([
	  function(callback){
	  	group.findById(groupid).exec(function(err,g){
	  		if (g.user.indexOf(userid) > -1) {
	  			cb('hehe');
	  		} else {
	  			// 添加成员到组中
	  			g.user.push(userid);
	  			g.save(function(err){
	  				if (!err) {
	  					callback(null)
	  				}
	  			});
	  		}
	  	})
	  },
	  function(callback){
	     // 更新成员的索引信息
	     user.findByIdAndUpdate(userid,{
	     	group: groupid
	     },function(err){
	     	if (!err) {
	     		cb('ok')
	     	}
	     })
	  }
	]);
}