//     __                                              
//    / /__  ____ ___  ____  ____  _________ ___  _____
//   / / _ \/ __ `__ \/ __ \/ __ \/ ___/ __ `__ \/ ___/
//  / /  __/ / / / / / /_/ / / / / /__/ / / / / (__  ) 
// /_/\___/_/ /_/ /_/\____/_/ /_/\___/_/ /_/ /_/____/  
                                                      
/**
 * @role: server
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

app.get('/api/site', routes.site)
app.get('/api/site/:type', routes.site)
app.get('/api/cata/:name', routes.cata)
app.get('/api/cata/:name/posts', routes.page)
app.get('/api/cata/:name/posts/:page', routes.page)
app.get('/api/posts/:id', routes.post);
app.get('/api/ads/:type/:limited', routes.ads);

http.createServer(app).listen(app.get('port'));