/**
 * @brief: 数据库模型
 * @author [turingou]
 */

var configure = {
	name: 'lemoncms' 
}

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	db = mongoose.createConnection('localhost', configure.name);

// 站点设置
var siteModel = new mongoose.Schema({
	name: String,
	icp: String,
	phone: String,
	fax: String,
	adr: String,
	email: String
});

// 分类与子分类
var cataModel = new mongoose.Schema({
	name: String,
	desc: String,
	alias: String,
	banner: {
		type: Schema.Types.ObjectId,
		ref: 'media'
	},
	posts: [{
		type: Schema.Types.ObjectId,
    	ref: 'post'
	}],
	pages: [{
		type: Schema.Types.ObjectId,
    	ref: 'post'
	}],
	master: {
		type: Schema.Types.ObjectId,
    	ref: 'cata'
	},
	slave: [{
		type: Schema.Types.ObjectId,
    	ref: 'cata'
	}]
});

// 文章与页面
var postModel = new mongoose.Schema({
	title: String,
	pubdate: Date,
	views: Number,
	body: String,
	banner: {
		type: Schema.Types.ObjectId,
		ref: 'media'
	},
	type: {
		type: String,
		default: 'post'
	},
	cata: [{
		type: Schema.Types.ObjectId,
    	ref: 'cata'
	}]
});

// 操作与管理员
var userModel = new mongoose.Schema({
	name: String,
	password: String,
	email: String,
	group: {
		type: Schema.Types.ObjectId,
  	ref: 'group'
	}
});

// 广告位
var adsModel = new mongoose.Schema({
	name: String,
	type: String, // banner topbanner microbanner
	href: String,
	target: String,
	src: {
		type: Schema.Types.ObjectId,
		ref: 'media'
	},
	meta: {
		width: Number,
		height: Number
	}
});

// 友情链接
var linksModel = new mongoose.Schema({
	name: String,
	href: String,
	target: String,
	src: String
});

// 用户分组
var groupModel = new mongoose.Schema({
	name: String,
	type: String,
	user: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}]
});

// 上传媒体管理
var mediaModel = new mongoose.Schema({
	name: String,
	filetype: String,
	src: String,
	pubdate: {
		type: Date,
		default: new Date()
	},
	sync: {
		stat: String,
		date: Date
	}
});

exports.site = db.model('site', siteModel);
exports.cata = db.model('cata', cataModel);
exports.post = db.model('post', postModel);
exports.user = db.model('user', userModel);
exports.ad = db.model('ad', adsModel);
exports.link = db.model('link', linksModel);
exports.group = db.model('group', groupModel);
exports.media = db.model('media', mediaModel);