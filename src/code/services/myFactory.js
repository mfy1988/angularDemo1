module.exports = function (app) {
    return app.factory('myFactory', 
        function ($q, $http, $rootScope) {
        var service = {};
        service.getData = function (args) {
            var str = "";
            for (var i in args) {
                if (str != "") { str += "&"; }
                str += i + "=" + args[i];
            }
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "/interface?lang=" + $rootScope.Lang + "&" + str
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
            return deferred.promise;
        };
        service.postData = function (args) {
            var data = args || {};
            data['lang'] = $rootScope.Lang;
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: "/interface",
                data: data
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
            return deferred.promise;
        };
        return service;
    })
};