/**
*
* API posts
* @brief: 根据分页或者类型拿到所有文章
*
**/

var post = require('../../ctrlers/post'); 

module.exports = function(req,res){
	post.fetch(req.params.type,{
		from: req.query.from,
		to: req.query.to
	},function(posts){
		res.json(posts);
	});
}