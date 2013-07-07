var model = require('../models'),
	cata = model.cata,
	async = require('async'),
	_ = require('underscore');

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

// 将所有分类目录的所有东西都查询出来
exports.all = function(cb) {
	cata.find({}).populate('banner').populate('master').populate('slave').exec(function(err,catas){
		if (!err) {
			var c = [];
			// 这里其实要根据master做一下梳理成树
			_.each(catas,function(index,item){
				if (item.master.length == 0) {
					// 那么这个cata是属于root的cata
					c.push(item)
				}
			});
			cb(c);
		} else {
			console.log(err)
		}
	})
}