module.exports = function (app) {
return app.config(function ($urlRouterProvider, $stateProvider,$locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
    $stateProvider
    .state('login', {
        url: '/login',
        template: require('../views/login.html'),
        controller:'loginCtrl',
    })
    .state('main', {
        url: '/main',
        template: require('../views/main.html'),
        controller: 'mainCtrl',
    })
    .state('main.lesson', {
        template: require('../views/lesson.html'),
        controller: 'lessonCtrl',
    })
    $urlRouterProvider.otherwise("/login");
});
}