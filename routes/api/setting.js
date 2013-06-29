/**
*
* API setting
* @brief: 站点配置
*
**/

var setting = require('../../ctrlers/setting'); 

var action = function(method,req,res) {
	if (method == 'GET') {
		setting.get(function(currentSetting){
			res.json(currentSetting);
		});
	} else if (method == 'POST') {
		setting.set(req.body,function(body){
			res.json({
				stat: 'ok',
				body: body
			});
		});
	}
}

module.exports = function(req,res){
	action(req.method,req,res);
}