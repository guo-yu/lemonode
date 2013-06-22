var model = require('../models'),
	post = model.post;

// 读取一篇文章或者一个页面的所有数据
exports.read = function(id,cb){
	post.findById(id).populate('banner').populate('cata').exec(function(err,post){
		if (!err) {
			cb(post)
		} else {
			cb('error')
		}
	});
}

// 获取所有文章或者所有页面
exports.fetch = function(type,page,cb) {
	post.find({
		type: type
	}).skip(page.from).limit(page.to).exec(function(err,allposts){
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
exports.update = function(id,body,cb) {
	// 这里可以直接使用update
	post.findByIdAndUpdate(id,body,function(err){
		if (!err) {
			cb(body);
		}
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