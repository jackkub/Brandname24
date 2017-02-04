angular.module('starter.controllers_InboxCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
   .controller('InboxCtrl', function($stateParams, $filter,DB,$scope, $state, $ionicHistory, ionicMaterialInk, ionicMaterialMotion,$firebaseArray) {
   $scope.login_user = JSON.parse(localStorage.getItem("user_login"));

     $scope.Params_seller = $stateParams.seller
        $scope.Params_buyer = $stateParams.buyer
        $scope.Params_product = $stateParams.id

   var ref = new Firebase("https://luminous-inferno-6016.firebaseio.com/");
   $scope.list_data = $firebaseArray(ref);

     $scope.login = JSON.parse(localStorage.getItem("login"));
 
   $scope.setProfile = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.profile = res.resource;
                    $scope.login_id = $filter('filter')($scope.profile, { face_id: $scope.login.id })[0];
                  /*   $scope.list_data.$loaded().then(function() {
                    $scope.list_name = $filter('filter')($scope.profile,{userid : })


                  })*/
                }
          console.log( $scope.profile)
            });


        }
$scope.setProfile();
console.log(JSON.stringify($scope.login_user[0].userid))
$scope.show_LogData = function(){

   DB.sp_param($scope.DB1, 'user_join_product').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.log = res.resource;
          $scope.list_log = $filter('filter')($scope.log,{face_id : $scope.login.id});

     
              }
console.log(JSON.stringify(  $scope.list_log))
 
            });
}
$scope.show_LogData();

/*$scope.myFilter = function (pro_duct) { 
   $scope.list_data.$loaded().then(function() {


  alert(JSON.stringify($scope.list_data))

  return pro_duct.pro_seller == $scope.Params_product  && msg.chat_by == $scope.Params_seller || msg.chat_by == $scope.Params_buyer ; 
     

      });
   // alert(msg)
};
$scope.myFilter();*/

        ionicMaterialInk.displayEffect();
        $scope.myGoBack = function() {
            $state.go('app.browse')
        };

  

         



    })