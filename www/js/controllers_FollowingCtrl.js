angular.module('starter.controllers_FollowingCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
   .controller('FollowingCtrl', function($scope,DB, ionicMaterialInk, ionicMaterialMotion,$stateParams,$ionicHistory,$filter) {
//ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();
        
          $scope.login = JSON.parse(localStorage.getItem("login"));  //Get User Login
      //  $scope.login_id = $scope.login[0].userid //Get ID user
        
       // console.log($scope.login);
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


 $scope.setProfile = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    var profile = res.resource;
                    $scope.login_id = $filter('filter')(profile, { face_id: $scope.login.id })[0];
                   
                }
              $scope.CheckFollowing();
            });


        }

$scope.setProfile();
        $scope.CheckFollowing = function(){


             console.log(JSON.stringify($scope.login_id.userid));
            $scope.follows = [];
            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.sys_ms_user left join brandname24.user_ms_followers on user_ms_followers.userid = sys_ms_user.userid and user_ms_followers.followersby ="+$scope.login_id.userid+" where sys_ms_user.userid !="+ $scope.login_id.userid
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "sys_ms_user.userid, sys_ms_user.username,sys_ms_user.firstname,sys_ms_user.lastname,sys_ms_user.photo,user_ms_followers.followersby"
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
                        if(v.followersby !== null){
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
                console.log(JSON.stringify($scope.data))
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
       // $scope.CheckFollowing();

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
            console.log(following,$scope.login_id.userid)
            var data = [{
                    "name": "in_userid",
                    "param_type": "IN",
                    "value": following
                }, {
                    "name": "in_followersby",
                    "param_type": "IN",
                    "value": $scope.login_id.userid
                }
            ];

            DB.sp_param($scope.DB1, 'user_ms_followers', data).then(function(res) {
            });
        }
    })