angular.module('starter.controllers_ProfileCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
   .controller('ProfileCtrl', function($scope,$filter, ionicMaterialInk, ionicMaterialMotion,DB,$stateParams , $state) {
  

 // $scope.login = JSON.parse(localStorage.getItem("login"));
       
     //Get User Login
       // $scope.login_id = $scope.login[0].userid //Get ID user
        $scope.profile = JSON.parse(localStorage.getItem("login"));
        $scope.color = ['#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9'];
        $scope.count_like = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          $scope.login = JSON.parse(localStorage.getItem("user_login"));  

        $scope.ClickLike = function(index) {
            if ($scope.color[index] == '#C9C9C9') {
                $scope.count_like[index] += 1;
                $scope.color[index] = '#FF5656';
            } else {
                $scope.count_like[index] -= 1;
                $scope.color[index] = '#C9C9C9';
            }
        }
$scope.get_user = function(){

            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {
                //console.log(JSON.stringify(res));
                /*  $scope.loading();*/
                if (res.resource !== undefined) {
                    $scope.user = res.resource;
                    $scope.login_id = $filter('filter')($scope.user ,{face_id :$scope.profile.id })[0];
                }
                  //console.log(JSON.stringify($scope.categoriedetail +'-'+  $scope.Params_seller +'-'+  $scope.login_id.face_id))
                console.log(JSON.stringify($scope.login_id));
      $scope.CheckFollowing();
            })


}
$scope.get_user();
        $scope.CheckFollowing = function(){
            //getTable From DB
            $scope.follows = [];
            $scope.following = [];
            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.user_ms_followers"
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
                    $scope.data = res.resource;
                    
                    $scope.follows = $filter('filter')($scope.data, { userid: $scope.login_id.userid });
                    $scope.following = $filter('filter')($scope.data, { followersby: $scope.login_id.userid });
                $scope.count_follows =   $scope.follows.length ;

                console.log($scope.follows.length+"---"+$scope.following.length)
                  console.log(JSON.stringify( $scope.follows.length))
                }
            });
        }
    
 

 $scope.show_join_user_porduct = function() {


        //  $scope.loading();
        DB.sp_param($scope.DB1, 'user_join_product').then(function(res) {

            if (res.resource !== undefined) {
                $scope.pro_data = res.resource;

                $scope.login_Params = $filter('filter')($scope.pro_data, { face_id: $scope.profile.id });
            }
         //   console.log(JSON.stringify($scope.login_Params));
        });
    }
    $scope.show_join_user_porduct();


        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.fadeSlideIn();

        $scope.color = ['#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9'];
        $scope.count_like = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.ClickLike = function(index) {
            if ($scope.color[index] == '#C9C9C9') {
                $scope.count_like[index] += 1;
                $scope.color[index] = '#FF5656';
            } else {
                $scope.count_like[index] -= 1;
                $scope.color[index] = '#C9C9C9';
            }



        }
    })