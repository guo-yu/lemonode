var model = require('./models'),
	ad = model.ad;

// 新建一个广告位
exports.create = function(baby) {
	var baby = new ad(baby);
	baby.save(function(err){
		if (!err) {
			cb(baby)
		}
	})
}

// 编辑一个广告位
exports.update = function(id,body,cb) {
	ad.findByIdAndUpdate(id,body,function(err){
		if (!err) {
			cb(body);
		}
	})
}

// 删除一个广告位
exports.remove = function(id) {
	ad.findByIdAndRemove(id,function(err){
		cb(id)
	})
}