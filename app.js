/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var exphbs = require('express-handlebars');
var index = require('./routes/index');
var earn = require('./routes/earn');
var home = require('./routes/home');
var redeem = require('./routes/redeem');
var login = require('./routes/login');
var leaderboard = require('./routes/leaderboard');


// Example route
// var user = require('./routes/user');

var app = express();

var bodyParser = require('body-parser');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.engine('handlebars', handlebars());
app.engine('handlebars', exphbs({
    helpers: {
        json: function (context) {
            return JSON.stringify(context);
        },
        ifCond: function (v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        increment: function (index) {
            return index + 1;
        }
    }
}));

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
app.get('/earn2', earn.viewEmpty2);
app.get('/earn/:projectName', earn.view);
app.get('/earn2/:projectName', earn.view2);
app.get('/nav', earn.nav);
app.get('/home', home.view);
app.get('/redeem', redeem.view);
app.get('/leaderboard', leaderboard.view);

app.post('/levelUp', redeem.levelUp);
app.post('/setGoal', redeem.setGoal);
app.post('/login', login.post);
app.post('/point', earn.point);
app.post('/buy', leaderboard.buy);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
