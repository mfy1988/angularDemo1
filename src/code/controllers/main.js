module.exports = function (app) {
    return app.controller('mainCtrl', 
        function ($scope, $state, myFactory, $location) {
            $scope.$on('$viewContentLoaded', function (event) {
                $state.go('main.lesson');
            
        }); 
        $scope.quit = function(){
            $state.go('login');
        };
        // $scope.logout = function () {
        //     myFactory.getData({ action: "logout" }).then(function (d) {
        //         if (d.error == "") {
        //             $location.replace();
        //         }
        //     });
        // };
        
       
    })
};