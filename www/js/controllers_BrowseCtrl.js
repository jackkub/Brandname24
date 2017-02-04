angular.module('starter.controllers_BrowseCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
     .controller('BrowseCtrl', function($scope, DB, ionicMaterialInk, ionicMaterialMotion) {
        ionicMaterialInk.displayEffect();
        $scope.categorie = null;
        ionicMaterialInk.displayEffect();
        $scope.GetCategorie = function() {
            $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_categorie').then(function(res) {
                //  console.log($scope.DB1);
                if (res.resource !== undefined) {
                    $scope.categorie = res.resource;
                      console.log(angular.toJson($scope.categorie));

                } else {
                    alert(res.error.message);
                }
                $scope.hide();
                //console.log(JSON.stringify($scope.list));
            });


        }
        $scope.GetCategorie();
        /*setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
        */
    })