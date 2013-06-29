var model = require('../models'),
	media = model.media;
	cdn = require('../lib/cdn'),
	async = require('async');

// 新建一个媒体，可以是图片，或者其他附件
exports.create = function(src,cb) {
	var baby = new media({
		name: src.substr(0,src.lastIndexOf('.'))
		filetype: src.substr(src.lastIndexOf('.') + 1),
		src: src
	});
	baby.save(function(err){
		if (!err) {
			cb(baby._id);
		}
	});
}

// 同步一个媒体文件到相应的云服务
exports.sync = function(id) {

	async.waterfall([
	  function(callback){
	  	  media.findById(id).exec(function(err,file){
	  	  	if (!err) {
	  	  		callback(null,file);
	  	  	}
	  	  })
	  },
	  function(file, callback){
	  	  fs.readFile(src,function(err,data){
	  	  	callback(null,file,data)
	  	  });
	  },
	  function(file, raw, callback){
	  	cdn.sync(file,raw,function(stat){
	  		cb(stat);
	  	})
	  },
	  function(stat,callback) {
	  	media.findByIdAndUpdate(id,{
	  		'sync.date': new Date(),
	  		'sync.stat': stat
	  	},function(err){
	  		if (!err) {
	  			cb(stat)
	  		} else {
	  			console.log(err);
	  		}
	  	})
	  }
	]);
}

// 删除一个媒体
// 但我们干嘛要删除一个媒体文件呢？
exports.remove = function(id) {
	// 这里也可以做硬盘上删除的操作，但受限于权限。
	media.findByIdAndRemove(id,function(err){
		cb(id)
	})
}