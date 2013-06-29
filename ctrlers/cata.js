var model = require('../models'),
	cata = model.cata,
	async = require('async');

// 新建一个文章分类
exports.create = function(baby, cb) {
	var baby = new cata(baby);
	baby.save(function(err) {
		if(!err) {
			cb(baby._id);
		}
	});
}

// 更新文章分类
exports.update = function(id, body, cb) {
	cata.findByIdAndUpdate(id, body, function(err) {
		if(!err) {
			cb(id)
		}
	})
}

// 读取一个分类的所有文章或页面
exports.fetch = function(id,cb) {
	cata.findById(id).populate('posts').populate('pages').populate('banner').exec(function(err,c){
		if (!err) {
			cb(c);
		}
	})
}

// 读取一个分类的节点信息
exports.nodes = function(id,cb) {
	cata.findById(id).populate('slave').exec(function(err,c){
		if (!err) {
			cb(c);
		}
	})
}