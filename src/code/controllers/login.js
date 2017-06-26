module.exports = function (app,msg) {
    return app.controller('loginCtrl',
      function ($scope, $state, myFactory) {
          $scope.login = function(){
            var u = $scope.username;
            var p = $scope.password;
            if(!!u && !!p){ 
               myFactory.postData({
                    action: "login",
                    username: u,
                    password: p,
                    status:true
                }).then(function (d) {
                    if (d.error) {
                        msg.m("用户名或密码错误！")
                    }
                    else{
                        sessionStorage.setItem('ISSUPER', d.issuper);
                        sessionStorage.setItem('USERID', d.userid);
                        if(d.issuper == 1){
                            $state.go('main');
                        }else{
                            $state.go('');//进入非管理员界面
                        }
                    }       
                });
            }
            else{
                msg.m("用户名密码不能为空！") 
            }
        }
      })
};