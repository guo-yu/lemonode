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
  app.use(express.cookieParser('lemonCMS'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// front-end interface
// use different themes
// app.get('/', require('./routes/index'))
// app.get('/post/:id', require('./routes/post'))
// app.get('/page/:id', require('./routes/page'))
// app.get('/author/:id', require('./routes/index'))
// app.get('/archive', require('./routes/archive'))

// core api
app.get('/api/system', require('./routes/api/system'))
app.all('/api/setting', require('./routes/api/setting'))
app.get('/api/catas', require('./routes/api/catas'));
app.all('/api/cata/:id', require('./routes/api/cata'));
app.get('/api/posts/:type', require('./routes/api/posts'))
app.all('/api/post/:id', require('./routes/api/post'))
// app.get('/api/ads/:type', require('./routes/api/ads'))

// install interface
app.all('/install',require('./ctrlers/install').uninstall, require('./routes/admin/install'));

// admin interface
app.get('/admin',require('./ctrlers/install').install,require('./routes/admin/index'));

http.createServer(app).listen(app.get('port'))