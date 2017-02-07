var port = process.env.PORT || 3000;

var dbUrl='mongodb://localhost/imooc';

var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoose = require('mongoose');
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
    console.log('Connection success!')
});

var morgan=require('morgan');
var logger=morgan(':method :url :status');





app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');


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

