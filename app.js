//     __                                              
//    / /__  ____ ___  ____  ____  _________ ___  _____
//   / / _ \/ __ `__ \/ __ \/ __ \/ ___/ __ `__ \/ ___/
//  / /  __/ / / / / / /_/ / / / / /__/ / / / / (__  ) 
// /_/\___/_/ /_/ /_/\____/_/ /_/\___/_/ /_/ /_/____/  
                                                      
/**
 * @role: server core
 * @author [turingou]
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// 填入配置项
require('./config').get(function(siteinfo){
  // app.locals['site'] = siteinfo;
  app.locals['site'] = {
    name: 'for test'
  }
});

// 填入引擎信息
require('./config').system(function(systemInfo){
  app.locals['system'] = systemInfo;
  console.log(app.locals['system']);
});

// core api read
// app.get('/api/site', require('./routes/api/site'))
// app.get('/api/site/:type', require('./routes/api/site'))
// app.get('/api/cata/:name', require('./routes/api/cata'))
// app.get('/api/cata/:name/posts', require('./routes/api/cata'))
// app.get('/api/cata/:name/posts/:page', require('./routes/api/cata'))
// app.get('/api/posts/:id', require('./routes/api/post'))
// app.get('/api/ads/:type/:limited', require('./routes/api/ads'))

// core api write
// app.post('/api/site', require('./routes/api/post/site'))

// front-end interface
app.get('/',require('./routes/index'));

// admin interface
app.get('/admin',require('./routes/admin/index'));

http.createServer(app).listen(app.get('port'));