angular.module('starter.controllers_SearchCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
   .controller('SearchCtrl', function(DB, $scope, $state, $ionicHistory, ionicMaterialInk, $ionicModal) {
        $scope.categorie12 = "";
        $scope.filter_text = "Recent";
        $scope.brand12 = "";
        $scope.ALL = "ALL";
        $scope.ALL_brand = "ALL";
        ionicMaterialInk.displayEffect();
        // $scope.loading();
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $ionicModal.fromTemplateUrl('templates/modal/modal-categorie.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_categorie12 = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal/modal-brand.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_brand12 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal/modal-filter.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_filter = modal;
        });

        $scope.SetmodalCategorie = function(u) {
            console.log(u);
            $scope.categorie12 = u.split(',')[0];
            $scope.categorie123 = u.split(',')[1];
            $scope.modal_categorie12.hide();
            /*$scope.data1 = $filter('filter')( $scope.search_categorie,{cat_id :$scope.product.cat_id })[0];
            $scope.pro_id = $scope.data1.pro_id ;
            $scope.categorie12= $scope.data1.cat_id ;*/
            console.log(JSON.stringify($scope.categorie12));
        };
        $scope.SetmodalBrand = function(u) {
            console.log(u);
            $scope.brand12 = u.split(',')[0];
             $scope.brand123 = u.split(',')[1];
            $scope.modal_brand12.hide();
            console.log(JSON.stringify($scope.brand12));

        };
        $scope.SetmodalFilter = function(u) {

            console.log(JSON.stringify(u));
            $scope.filter = u;
            /* if($scope.filter.type == 1){

 console.log(JSON.stringify($scope.product  ));
}*/
        };
        $scope.CheckValidateFilter = function() {
            var filter_arr = ['Poppular', 'Recent', 'Lowest Price', 'Highest Price'];
            $scope.filter_text = filter_arr[parseInt($scope.filter.type) - 1];
            $scope.modal_filter.hide();
            // $scope.filter_orderby_list();

            if ($scope.filter_text == 'Poppular') {

                $scope.filter_text = 'Poppular'
            }
            if ($scope.filter_text == 'Recent') {

                $scope.filter_text = 'Recent'
            }
            if ($scope.filter_text == 'Lowest Price') {

                $scope.filter_text = 'Lowest Price'
            }
            if ($scope.filter_text == 'Highest Price') {

                $scope.filter_text = 'Highest Price'
            }

            var data1 = [{
                    "name": "in_type",
                    "param_type": "IN",
                    "value": $scope.filter_text
                },
                {
                    "name": "in_type_min",
                    "param_type": "IN",
                    "value": $scope.filter.price_min
                },
                {
                    "name": "in_type_max",
                    "param_type": "IN",
                    "value": $scope.filter.price_max
                },
            ];
            DB.sp_param($scope.DB1, 'filter_orderby', data1).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.shop_orderby = res.resource;

                }
                //$scope.hide();        
                console.log(JSON.stringify( $scope.shop_orderby));
            })



        }



        /*setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
        */

        $scope.filter_orderby_list = function() {
  
            DB.gettable ($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.shop_orderby = res.resource;

                }
                //$scope.hide();        
               //console.log(JSON.stringify($scope.shop_orderby));
            })



        }
        $scope.filter_orderby_list();
        $scope.Show_Product = function() {

            DB.gettable($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product = res.resource;



                }


            })


        }
        $scope.Show_Product();

        $scope.Show_search_categorie = function() {


            DB.gettable($scope.DB1, 'sys_ms_categorie').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.search_categorie = res.resource;
                }

                //console.log(JSON.stringify($scope.search_categorie));
            })


        }
        $scope.Show_search_categorie();

        $scope.Show_search_brand = function() {


            DB.gettable($scope.DB1, 'sys_ms_brand').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.search_brand = res.resource;
                }

                //            console.log(JSON.stringify($scope.search_brand));
            })



        }
        $scope.Show_search_brand();



    })