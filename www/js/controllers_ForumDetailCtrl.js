angular.module('starter.controllers_ForumDetailCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])//'angularMoment',
    .controller('ForumDetailCtrl', function ($filter,DB,$scope, $ionicModal, ionicMaterialInk, ionicMaterialMotion,$stateParams) {
        
        ionicMaterialInk.displayEffect();
        $scope.par_id = $stateParams.id ;
        $scope.modal_new = "";
        $scope.color = '#C9C9C9';
        $scope.login = JSON.parse(localStorage.getItem("login"))
     $scope.like_qut = 0;
      //  $scope.login_id = $scope.login[0].userid
        $scope.reply = {};
        console.log($scope.login_id);
        
        $ionicModal.fromTemplateUrl('templates/forum/modal-comment.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_new = modal;
        });
        $scope.ShowModal = function() {
            $scope.modal_new.show();
        }

        //moment time
        $scope.conv_time = function(date){
            var unixtime =new Date(date).getTime();
            return unixtime;
        }
        moment.lang('th', {
            relativeTime : {
                future: "in %s",
                past:   "%s ago",
                s:  "seconds",
                m:  "a minute",
                mm: "%d minutes",
                h:  "an hour",
                hh: "%d hours",
                d:  "a day",
                dd: "%d days",
                M:  "a month",
                MM: "%d months",
                y:  "a year",
                yy: "%d years"
            }
        });
        // End moment

$scope.get_user = function(){

            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {
                //console.log(JSON.stringify(res));
                /*  $scope.loading();*/
                if (res.resource !== undefined) {
                    $scope.user = res.resource;
                    $scope.login_id = $filter('filter')($scope.user ,{face_id :$scope.login.id })[0];
                }
                console.log(JSON.stringify($scope.login_id.userid));

            })


}
$scope.get_user();




  $scope.show_forum_data = function() {

            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.sys_ms_forum join brandname24.sys_ms_user on sys_ms_forum.forum_by = sys_ms_user.userid"
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "*"
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
                    $scope.forum_detail = res.resource;

                }
              console.log(JSON.stringify($scope.forum_detail))
            });

        }
        console.log($scope.forum_detail);
        $scope.show_forum_data();


        // show comment
        $scope.Show_Reply = function(){
            //getTable From DB
           var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.sys_ms_user join brandname24.forum_ms_reply on forum_ms_reply.userid = sys_ms_user.userid where forum_id = "+$stateParams.id
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "*"
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
                    $scope.comm_reply = res.resource;
                }
                console.log(JSON.stringify($scope.comm_reply))
            });
        }
        $scope.Show_Reply();

        //New Comment
        $scope.New_Comm = function(){
            var data = [{
                    "name": "in_reply_id",
                    "param_type": "IN",
                    "value": null
                }, {
                    "name": "in_forum_id",
                    "param_type": "IN",
                    "value": $scope.par_id
                }, {
                    "name": "in_userid",
                    "param_type": "IN",
                    "value": $scope.login_id.userid
                },{
                    "name" : "in_reply_comment",
                    "param_type": "IN",
                    "value": $scope.reply.new_comm

                }
            ];

            DB.sp_param($scope.DB1, 'forum_ms_reply', data).then(function(res) {

                if (res.resource !== undefined) {
                    $scope.Show_Reply();
                    $scope.reply = {};
                } 
            });
        }

        // Like Forum By User
       $scope.btn_like = function(){

            var data = [{
                    "name": "par_forum_id",
                    "param_type": "IN",
                    "value": $scope.par_id
                }, {
                    "name": "par_userid",
                    "param_type": "IN",
                    "value": $scope.login_id.userid
                }
            ];
            
            DB.sp_param($scope.DB1, 'like_forum', data).then(function(res) {
                console.log(JSON.stringify(res));
                if (res.resource !== undefined) {
                    $scope.like = res.resource;
                    if ($scope.like[0].status == null) {
                        $scope.color = '#FF5656';
                        $scope.like_qut+=1
                    }else{
                        $scope.color = '#C9C9C9';
                        $scope.like_qut-=1
                    }
                } 
            });
        }
         $scope.like_count = function () {
            // body...

             var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.forum_ms_detail where id_forum ="+$stateParams.id
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "count(id_forum) as like_qut"
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
                    $scope.like_qut = res.resource[0].like_qut;
                }
            });
        }
        $scope.like_count();
        // Fisht Check Like Forum
        $scope.chk_like = function () {
            // body...

             var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.forum_ms_detail where forum_rec_by ="+$scope.login_id
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "*"
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
                    if(res.resource[0].id_forum == $scope.par_id){
                        $scope.color = '#FF5656';
                    }
                    
                }
            });
        }
        $scope.chk_like();

    })
    // แก้การทำงาน 2 ครั้ง 
    // ngClick Fires Twice on Button
    // https://github.com/driftyco/ionic/issues/1022
    .config(function($mdGestureProvider) {
        $mdGestureProvider.skipClickHijack();
    })