var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(jsonParser);
var compression = require('compression');
var cookieParser = require('cookie-parser');
var config = require('./server/config.js');
var action = require('./server/action.js');
var path = require('path');
app.use(compression());
app.use(cookieParser(config.cookie_key));
app.all('*', function (req, res, next) {
    var ext = path.extname(req.originalUrl.toLocaleLowerCase());
    ext = ext ? ext.slice(1) : 'unknown';
    if (ext.match(config.expires.fileMatch)) {
        var expires = new Date();
        expires.setTime(expires.getTime() + config.expires.maxAge * 1000);
        res.header("Expires", expires.toUTCString());
        res.header("Cache-Control", "max-age=" + config.expires.maxAge);
    }
    next();
});
var session = require('express-session');
app.use(session({
    secret: config.cookie_key,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.session_maxage
    },
}));
app.use(function (req, res, next) {
    if (req.session) {
        req.session._garbage = Date();
        req.session.touch();
    }
    else{
        res.status(200).send('{"err":"session service is invalid"}');
        return;
    }
    next();
});
app.post('/interface', jsonParser, function (req, res) {
    var ps = req.body;
    if (ps['action'] != "login") {
        if (!req.session['USERID']) {
            res.status(200).send('{"err":"Permission denied"}');
            return;
        }
    }  
    action.post(ps, res, req);
});
app.get('/interface', function (req, res) {
    var bus = req.query;
    if (bus == "logout") {
        req.session.USERID = null;
        res.status(200).send('{"err":""}');
        return;
    }
    if (!req.session['USERID']) {
        res.status(200).send('{"err":"Permission denied"}');
        return;
    }
    action.get(req, res);
});
app.use(express.static('dist'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    if (err.status == 404) {
        res.status(200).send('{"err":"404 Not Found"}');
    }
    else {
        res.status(200).send('{"err":"Server error code ' + err.status + '"}');
    }
    next();
});
var server = app.listen(config.web_default_port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server running at http://%s:%s', host, port);
});