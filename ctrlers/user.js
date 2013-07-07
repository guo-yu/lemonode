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
	async.waterfall([
	  function(callback){
	  		// 先找到这个用户所在的组
	  		user.findById(id).exec(function(err,u){
	  			if (!err) {
	  				if (u) {
	  					callback(null,u.group)
	  				}
	  			} else {
	  				console.log(err)
	  			}
	  		})
	  },
	  function(gid, callback){
	  		// 从这个组里删除这个用户
	  		group.findById(gid).exec(function(err,g){
	  			// 这里的语法不一定正确，还要再参照mogoose的文档
	  			g.user.remove();
	  			g.save(function(err){
	  				if (!err) {
	  					callback(null,gid);
	  				}
	  			})
	  		});
	  function(gid, callback){
	  		// 再去删除这个用户
				user.findByIdAndRemove(id,function(err){
					if (!err) {
						cb(id)
					} else {
						console.log(err)
					}
				});
	  }
	]);
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