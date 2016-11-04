/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars')

var index = require('./routes/index');
var earn = require('./routes/earn');
var home = require('./routes/home');
var redeem = require('./routes/redeem');
var login = require('./routes/login');
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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('method-override')());
app.use(require('cookie-parser')('sciwards'));
app.use(require('express-session')({
    secret: 'my cookie',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true
}));
//app.use(app.router);
app.use(express.static(path.join(__dirname, '/Public')));

// development only
/*
if ('development' == app.get('env')) {
  app.use(require('error-handler')());
}
*/

// Add routes here
app.get('/', index.view);
app.get('/earn', earn.viewEmpty);
app.get('/earn/:projectName', earn.view);
app.get('/nav', earn.nav);
app.get('/home', home.view);
app.get('/redeem', redeem.view);
app.post('/', redeem.subPoint);
app.post('/', redeem.setGoal);
app.post('/login', login.post);
app.get('/point', earn.point);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
