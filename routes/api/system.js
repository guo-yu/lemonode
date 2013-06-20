/**
*
* API system
* @brief: lemon系统引擎配置
*
**/

var sys = require('../../ctrlers/system'); 

module.exports = function(req,res){
	sys.get(function(info){
		res.json(info);
	});
}