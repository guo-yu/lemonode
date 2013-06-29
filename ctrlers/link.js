var model = require('../models'),
	link = model.link;

// 新建一个友情链接
exports.create = function(baby,cb) {
	var baby = new link(baby);
	baby.save(function(err){
		if (!err) {
			cb(baby._id);
		}
	});
}

// 更新链接
exports.update = function(id,body,cb) {
	link.findByIdAndUpdate(id,body,function(err){
		if (!err) {
			cb(id)
		}
	})
}

// 删除一个用户
exports.remove = function(id) {
	link.findByIdAndRemove(id,function(err){
		cb(id)
	});
}