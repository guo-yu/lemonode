var UPYun = require('upyun').UPYun;
var fs = require('fs');
var md5 = require('md5').md5;
var request = require('request');

exports.connect = function(upyunInfo) {
  cave = {};
  cave['info'] = new UPYun(upyunInfo.caveName,upyunInfo.adminName,upyunInfo.adminPassword);
  cave['url'] = upyunInfo.baseUrl;
  return cave;
}

exports.buffer = function(upyun, buffer , fileName , pubDir, cb) {

  var fileContent = buffer;
  var md5Str = md5(fileContent);

  upyun.setContentMD5(md5Str);
  upyun.setFileSecret('bac');

  upyun.writeFile(pubDir + fileName, fileContent, false, function(err, data) {
    if(!err) {
      cb(data);
    } else {
      cb(err)
    }
  });

}

exports.sync = function(upyun,fileDir,fileName,pubDir,cb) {
  
  var fileContent = fs.readFileSync( fileDir + fileName);
  var md5Str = md5(fileContent);

  upyun.setContentMD5(md5Str);
  upyun.setFileSecret('bac');

  upyun.writeFile(pubDir + fileName, fileContent, false, function(err, data) {
    if(!err) {
      cb(data);
    } else {
      cb(err)
    }
  });
}

exports.readDir = function(upyun,dir,callback) {
  upyun.readDir(dir,function(err,data){
    if (err) {
      callback(err)
    } else {
      callback(err,data)
    }
  })
}