angular.module('starter.controllers_FollowingMainCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
    .controller('FollowingMainCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion,DB,$stateParams) {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
		$scope.login = JSON.parse(localStorage.getItem("user_login"));  //Get User Login
        $scope.login_id = $scope.login[0].userid //Get ID user
        $scope.follows = "";
        $scope.like =[];

$scope.backLinkClick = function () {
            window.location.reload(false); 
            alert('a')
        };

        $scope.CheckFollowing = function(){
           
            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "sys_ms_user  join user_ms_followers on user_ms_followers.userid = sys_ms_user.userid where user_ms_followers.followersby ="+$scope.login_id
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "sys_ms_user.userid"
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
                        $scope.follows += "'"+v.userid+"'";

                        if ((k+1) != $scope.data.length) {
                         	// statement
                         	$scope.follows += ","
                        } 
                    }) 
                    $scope.Show_Product($scope.follows);            
                }
            });
        }
        $scope.CheckFollowing();

        $scope.Show_Product = function(follows) {
   			console.log(follows)
            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.shop_ms_product as product left join brandname24.shop_ms_detail as user on product.pro_id = user.pro_id and pro_rec_by = "+$scope.login_id +" where product.pro_seller in ("+follows+")"
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
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product = res.resource;
                    angular.forEach($scope.product, function(v, k) {
                        if(v.pro_rec_by !== null){
                            $scope.like.push('#FF5656');
                        }else{
                            $scope.like.push('#C9C9C9');
                        }
                    })

                }
                console.log(JSON.stringify(   $scope.product))
            })
        }
        $scope.btn_like = function(pro_id){

            var data = [{
                    "name": "par_product_id",
                    "param_type": "IN",
                    "value": pro_id
                }, {
                    "name": "par_userid",
                    "param_type": "IN",
                    "value": $scope.listlogin_id.userid
                }
            ];

            DB.sp_param($scope.DB1, 'like_shop', data).then(function(res) {
                console.log(JSON.stringify(res));
                if (res.resource !== undefined) {
                    $scope.like = res.resource;
                    if ($scope.like[0].status == null) {
                        $scope.color = '#FF5656';
                    }else{
                        $scope.color = '#C9C9C9';
                    }
                }
            });
        };

         
    })