angular.module('starter.controllers_FollowersCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('FollowersCtrl', function($scope,DB, ionicMaterialInk, ionicMaterialMotion,$stateParams,$ionicHistory) {
        //ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();
        
        $scope.login = JSON.parse(localStorage.getItem("user_login"));  //Get User Login
        $scope.login_id = $scope.login[0].userid //Get ID user
        
        console.log($scope.login);
        $scope.class_follow = ["button button-block button-positive","button button-block button-dark"];
        $scope.text_following = ["Follow", "Following"];
        // $scope.CheckFollowing = function(index) {
        //     $scope.class_follow = ["button button-block button-dark", "button button-block button-dark"];
        //     if ($scope.follow[index] == 1) {
        //         $scope.follow[index] = 0;
        //         $scope.class_follow[index] = "button button-block button-positive";
        //         $scope.text_following[index] = "Follow";
        //     } else if ($scope.follow[index] == 0) {
        //         $scope.follow[index] = 1;
        //         $scope.class_follow[index] = "button button-block button-dark";
        //         $scope.text_following[index] = "Following";
        //     }

        // }
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
          };
        $scope.CheckFollowing = function(){
            //getTable From DB
            $scope.follows = [];
            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": " user_ms_followers as follow left join user_ms_followers as follwing on follow.followersby = follwing.userid join sys_ms_user on sys_ms_user.userid = follow.followersby where follow.userid ="+$scope.login_id
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "follow.followersby userid,follwing.followersby i,sys_ms_user.username,sys_ms_user.firstname,sys_ms_user.lastname,sys_ms_user.photo "
                }, {
                    "name": "PAR_DB_FILTER",
                    "param_type": "IN",
                    "value": ""
                }, {
                    "name": "PAR_DB_LIMIT",
                    "param_type": "IN",
                    "value": ""
                }
            ];

            DB.sp_param($scope.DB1, 'SP_DB_TB_JOIN', data).then(function(res) {

                if (res.resource !== undefined) {
                    $scope.data = res.resource;
                    angular.forEach($scope.data, function(v, k) {
                        if(v.i == $scope.login_id){
                            $scope.follows.push({
                                userid : v.userid,
                                username : v.username,
                                firstname : v.firstname,
                                lastname : v.lastname,
                                photo : v.photo,
                                status : 1
                            });
                        }else{
                            $scope.follows.push({
                                userid : v.userid,
                                username : v.username,
                                firstname : v.firstname,
                                lastname : v.lastname,
                                photo : v.photo,
                                status : 0
                            });
                        }
                    })
                }
                console.log($scope.follows)
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        $scope.CheckFollowing();

        $scope.doRefresh = function() {
            $scope.CheckFollowing();
        };

        $scope.btn_follows = function(following){

            angular.forEach($scope.follows, function(v, k) {

                if(v.userid == following){
                    if (v.status == 0) {
                        $scope.follows[k].status = 1;
                    }else if(v.status == 1){
                        $scope.follows[k].status = 0;
                    }
                }
            })
            console.log(following,$scope.login_id)
            var data = [{
                    "name": "in_userid",
                    "param_type": "IN",
                    "value": following
                }, {
                    "name": "in_followersby",
                    "param_type": "IN",
                    "value": $scope.login_id
                }
            ];

            DB.sp_param($scope.DB1, 'user_ms_followers', data).then(function(res) {
                console.log(data);
            });
        }
    })
