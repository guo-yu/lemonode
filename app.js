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

// front-end interface
// use different themes
// app.get('/', require('./routes/index'))
// app.get('/post/:id', require('./routes/post'))
// app.get('/page/:id', require('./routes/page'))
// app.get('/author/:id', require('./routes/index'))
// app.get('/archive', require('./routes/archive'))

// core api read
app.all('/api/system', require('./routes/api/system'))
app.all('/api/site', require('./routes/api/site'))
// app.get('/api/site/:type', require('./routes/api/site'))
// app.get('/api/cata/:name', require('./routes/api/cata'))
// app.get('/api/cata/:name/posts', require('./routes/api/cata'))
// app.get('/api/cata/:name/posts/:page', require('./routes/api/cata'))
// app.get('/api/posts/:id', require('./routes/api/post'))
// app.get('/api/ads/:type/:limited', require('./routes/api/ads'))
// app.get('/api/setting', require('./routes/api/setting'))

// core api write
// app.post('/api/site', require('./routes/api/site'))

// admin interface
app.get('/admin',require('./routes/admin/index'));

http.createServer(app).listen(app.get('port'))