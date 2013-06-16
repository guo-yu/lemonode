var model = require('../models'),
	post = model.post;

// 读取一篇文章或者一个页面的所有数据
exports.read = function(pid,cb){
	post.findById(id).populate('banner').populate('cata').exec(function(err,post){
		if (!err) {
			cb(post)
		} else {
			cb('error')
		}
	});
}

// 获取所有文章或者所有页面
exports.fetch = function(type,cb) {
	post.find({
		type: type
	}).exec(function(err,allposts){
		if (!err) {
			cb(allposts)
		}
	})
}

// 新建文章或者页面
exports.create = function(baby,cb) {
	var baby = new post(baby);
	baby.save(function(err){
		if (!err) {
			cb(baby);
		} else {
			console.log(err)
		}
	})
}

// 编辑文章或者页面
exports.edit = function(id,body,cb) {
	// 这里可以直接使用update
	post.findById(id).exec(function(err,post){
		_.each(post,function(value,key){
			post[key] = body[key];
		});
		post.save(function(err){
			if (!err) {
				cb(post);
			}
		})
	})
}

// 删除文章或者页面
exports.remove = function(id) {
	post.findById(id).exec(function(err,post){
		if (!err) {
			post.remove();
			post.save();
		}
	})
}