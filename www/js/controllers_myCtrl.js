angular.module('starter.controllers_myCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('myCtrl', ['fileUpload' ,'$scope', '$cordovaImagePicker', '$ionicModal', '$filter', '$ionicHistory', 'ionicMaterialInk', 'ionicMaterialMotion', 'DB', function( fileUpload ,$scope, $cordovaImagePicker, $ionicModal, $filter, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, DB) {

        $scope.show_user = function() {

            DB.sp_param($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.data_user = res.resource;

                }
                // console.log(JSON.stringify( $scope.data_user ));
            })

        }
        $scope.show_user();
        $scope.uploadFile = function() {
            var file = $scope.myFile;
            var file1 = $scope.myFile1;
            var file2 = $scope.myFile2;
            var file3 = $scope.myFile3;
            console.log('file is ');
            //  console.dir(file.name +','+file1.name+','+file2.name +','+file3.name );

            var uploadUrl = "/api/v2/image/";
            fileUpload.uploadFileToUrl(file, uploadUrl);
            if ($scope.myFile !== undefined) {
                fileUpload.uploadFileToUrl(file, uploadUrl);
                $scope.image = file.name;
            }
            if ($scope.myFile1 !== undefined) {
                fileUpload.uploadFileToUrl(file1, uploadUrl);
                $scope.image1 = file1.name
            }
            if ($scope.myFile2 !== undefined) {
                fileUpload.uploadFileToUrl(file2, uploadUrl);
                $scope.image2 = file2.name;
            }
            if ($scope.myFile3 !== undefined) {
                fileUpload.uploadFileToUrl(file3, uploadUrl);
                $scope.image3 = file3.name;
            }
            var product_chat = [{
                    "name": "in_pro_id",
                    "param_type": "IN",
                    "value": $scope.pro_id
                }, {
                    "name": "in_cat_id",
                    "param_type": "IN",
                    "value": $scope.cat_value
                }, {
                    "name": "in_bra_id",
                    "param_type": "IN",
                    "value": $scope.brand_value
                }, {
                    "name": "in_pro_name",
                    "param_type": "IN",
                    "value": $scope.desc_name
                }, {
                    "name": "in_pro_detail",
                    "param_type": "IN",
                    "value": $scope.desc_detail
                }, {
                    "name": "in_pro_price",
                    "param_type": "IN",
                    "value": $scope.pro_price
                }, {
                    "name": "in_pro_sharing",
                    "param_type": "IN",
                    "value": $scope.pro_sharing
                }, {
                    "name": "in_pro_photo",
                    "param_type": "IN",
                    "value": $scope.image + ',' + $scope.image1 + ',' + $scope.image2 + ',' + $scope.image3
                }, {
                    "name": "in_pro_seller",
                    "param_type": "IN",
                    "value": null
                }, {
                    "name": "in_pro_like",
                    "param_type": "IN",
                    "value": $scope.pro_like
                }, {
                    "name": "in_pro_share",
                    "param_type": "IN",
                    "value": $scope.pro_share
                }, {
                    "name": "in_pro_status",
                    "param_type": "IN",
                    "value": $scope.pro_status
                }



            ];
            DB.sp_param($scope.DB1, 'shop_ms_product', product_chat).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product_sell1 = res.resource;


                    if (localStorage.getItem("product_chat") == null) {
                        localStorage.setItem("product_chat", JSON.stringify(product_chat))






                    }
                    console.log(JSON.stringify($scope.product_sell1));

                }

                //$scope.hide();        

            })

        }


    }])