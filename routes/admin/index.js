/*
 * GET admin page.
 */

module.exports = function(req, res){
  res.render('admin/index',{
  	title: '后台'
  });
};