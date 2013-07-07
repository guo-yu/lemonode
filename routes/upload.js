// 处理上传后的文件
module.exports = function(req, res) {

  if(req.session.user) {
    var path = req.files.image.path;
    res.json({
      stat: 'ok',
      file: req.files.image,
      url: path.substr(path.lastIndexOf('/uploads'))
    });
  } else {
    res.json({
      stat: 'error',
      msg: 'access deny'
    })
  }
  
}