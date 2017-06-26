module.exports = function (app,jQuery,msg) {
    return app.controller('lessonCtrl', 
        function ($scope, $state, $timeout, myFactory, $rootScope) {
        $scope.$on('$viewContentLoaded', function (event) {      
            myFactory.getData({ action: "getPeople" }).then(function (d) {
                if (d.err) {
                    msg.m("获取数据有误")
                }
                else{
                    $scope.data = d;
                } 
            });
            $scope.getcourse();
        });
        $scope.getcourse = function(){
            myFactory.getData({ action: "getcourse" }).then(function (d) {
                if (d.err) {
                    msg.m("获取数据有误")
                }
                else{
                    $scope.datas = d;
                } 
            });
        }
        $scope.addCourse = function () {
            var title = $scope.course;
            var user = $scope.user;
            if(!title || !user){
                msg.m('课程名和主讲人均不可为空');
            }
            else{
                var realname = $scope.user.realname;
                var userid = $scope.user.userid;
                myFactory.postData({ 
                    action: "addCourse",
                    title: title,
                    realname:realname, 
                    userid: userid
                }).then(function (d) {
                    if(d.err){
                        msg.m(d.err);
                    }
                    else{ 
                       msg.m(d.msg); 
                       $scope.getcourse(); 
                    }            
                })
            };
        };
        $scope.update = function(scope){
            var _this = scope;
            console.log(_this);
            console.log(arguments);
            var index = $(_this)[0].$index;
            $('.add').css({'display':'block','top':30*index});  
            $scope.finish = function(){
                var trainingtime = $('.date').val();
                if(!trainingtime){
                    msg.m('培训时间不能为空');
                }else{
                    myFactory.postData({ 
                        action: "update",
                        trainingtime:trainingtime,
                        index:index
                    }).then(function (d) {
                        if(d.err){
                            msg.m(d.err);
                        }
                        else{ 
                            msg.m(d.msg);
                            $('.add').css({'display':'none'});                         
                            $timeout(function(){
                               $('tbody tr').eq(index).find('#trainingtime').text(trainingtime);
                               $('tbody tr').eq(index).find('#status').text('已结束');
                               $('tbody tr').eq(index).find('.td').text('');
                            }); 
                        }                  
                    })   
                }
            }        
        }
        $scope.delcourse = function(scope){
            var _this = scope;
            var index = $(_this)[0].$index;
            myFactory.postData({ 
                action: "delcourse",
                index:index
            }).then(function (d) {
               if(d.err){
                    msg.m(d.err);
                }
                else{ 
                   msg.m(d.msg); 
                   $scope.getcourse(); 
                }            
            })   
        }
    })
};