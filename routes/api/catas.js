// catas
var cata = require('../../ctrlers/cata');

module.exports = function(req,res,next){
  cata.all(function(catas){
    res.json(catas);
  })
}