
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars')

var index = require('./routes/index');
var earn = require('./routes/earn');
// Example route
// var user = require('./routes/user');

var app = express();

var bodyParser = require('body-parser');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
//app.use(require('favicon')());
//app.use(require('logger')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('method-override')());
app.use(require('cookie-parser')('sciwards'));
app.use(require('express-session')());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
/*
if ('development' == app.get('env')) {
  app.use(require('error-handler')());
}
*/

// Add routes here
app.get('/', index.view);
app.get('/earn/:projectName', earn.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
