var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan=require('morgan');
var logger=morgan(':method :url :status');

var port = process.env.PORT || 3000;
var app = express();
var dbUrl='mongodb://localhost/imooc';

mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
    console.log('Connection success!')
});

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({
    extended: true
}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
app.use(session({
    secret:'imooc',
    resave: false,
    saveUninitialized: true,
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));

if('development' === app.get('env')){
    app.set('showStackError',true);
    app.use(logger);
    app.locals.pretty = true;
    mongoose.set('debug',true)
}

require('./config/routes')(app);

app.listen(port, function () {
    console.log('imooc started on port ' + port);
});

