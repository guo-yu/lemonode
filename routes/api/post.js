/**
*
* API post
* @brief: 新建文章或者抓取文章
*
**/

var post = require('../../ctrlers/post'); 

var action = function(method,req,res) {
	if (method == 'GET') {
		post.read(req.params.id,function(p){
			res.json(p);
		});
	} else if (method == 'POST' && req.params.id == 'new') {
		post.create(req.body,function(body){
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