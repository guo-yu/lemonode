// 根据请求的当前时间生成唯一动态pin码
var md5 = require('./md5');

module.exports = function(id,cb) {
	if (id.length > 0) {
		var date = new Date()
		var pin = md5(date.toString() + id);
		return pin;
	} else {
		return false;
	}
}