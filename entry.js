require('./src/styles/template');

var angular = require('angular');

require('angular-route');

require('angular-ui-router');

var app = angular.module('myapp', ['ngRoute', 'ui.router']);

var myFactory = require('./src/code/services/myFactory')(app);

var msg = require('./src/code/services/msg');

require('./src/code/route')(app);

require('./src/code/controllers/login')(app,msg);

require('./src/code/controllers/main')(app);

require('./src/code/controllers/lesson')(app,jQuery,msg);
