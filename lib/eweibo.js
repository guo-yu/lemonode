/**
 *
 * @breif: 新浪微博专业版应用helpers
 *
 **/

// 三种情况：
// 1. 根本没有tokenString，viewer也是空的未登录情况
// 2. 有tokenString,但无法解析出正确token(没有oauth_token对象的情况)
// 3. 有登录用户且授权了该子应用的sub_key的时候，返回正确的token对象

// 现在这个逻辑不太对
exports.checker = function(req, res, next) {
	var token = {};
	var tokenString = req.query.tokenString;
	// 当有用户登录时解析token，不一定能解析出正确的token,因为不知道用户是否授权。
	if (tokenString) {
		token = exports.token(tokenString);
		console.log(token);
	}
	res.locals.token = token;
	next();
}

// 判断登录授权的用户是否是该子应用的管理员账户（是不是本账户）
exports.adminChecker = function(req,res,next) {
	console.log('hi admin cheker')
	var token = {};
	if (req.query.tokenString) {
		token = exports.token(req.query.tokenString)
		console.log(token);
		if (token.user_id && token.oauth_token) {
			// 已授权的用户，判断下是不是安装这个应用的微博账户
			if (token.user_id == req.query.cid) {
				res.locals.token = token;
				res.locals.token['subkey'] = req.query.sub_appkey;
				req.session['token'] = res.locals.token;
				next()
			} else {
				res.send('access deny');
			}
		} else {
			// 这个企业用户刚刚安装，还没授权
			token['subkey'] = req.query.sub_appkey;
			req.session['token'] = token;
			next()
		}
	} else {
		// 如果这货完全没登录的话呢...
		res.send('请使用企业版微博直接访问后台，谢谢。')
		// next()
	}
}

// 解析token的helper
exports.token = function(rawtoken) {
	rawtoken = rawtoken.substr(rawtoken.indexOf('.') + 1);
	var tokenString = new Buffer(rawtoken, 'base64').toString('ascii');
	var token = JSON.parse(tokenString);
	return token;
}