angular.module('starter.controllers_SellCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('SellCtrl', function(DB, $scope, ionicMaterialInk, ionicMaterialMotion, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, $cordovaCamera,$http) {
        $scope.Add_sell = function() {

            var file = $scope.myFile;

            console.log('file is ');
            console.dir(file);

            var uploadUrl = $scope.server+":"+ $scope.port +"/api/v2/files/img/";


            fileUpload.uploadFileToUrl(file, uploadUrl);

            var data6 = [{
                    "name": "in_pro_id",
                    "param_type": "IN",
                    "value": $scope.pro_id
                }, {
                    "name": "in_cat_id",
                    "param_type": "IN",
                    "value ": $scope.cat_value
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
                    "value": $scope.pro_photo
                }, {
                    "name": "in_pro_seller",
                    "param_type": "IN",
                    "value": $scope.pro_seller
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
            DB.sp_param($scope.DB1, 'shop_ms_product', data6).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product_sell11 = res.resource;
                }
                //$scope.hide();        
                console.log(JSON.stringify(data6));
            })


        };


        $scope.imgURI = [
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png',
            'http://images.designtrends.com/wp-content/uploads/2016/01/18110453/Flat-Camera-Icon.png'
        ];
        $scope.categorie1 = "Choose One";
        $scope.brand1 = "Choose One";
        $scope.name = "What are you selling ?";
        $scope.desc = "";

        $scope.pro_id = null;
        $scope.cat_value = "";
        $scope.brand_value = "";
        $scope.pro_price = 100;
        $scope.pro_sharing = 1;
        $scope.pro_photo = "11";
        $scope.pro_seller = '1';
        $scope.pro_like = 1;
        $scope.pro_share = 1;
        $scope.pro_status = "1";
        $scope.cat_value = "";

        $scope.Show_sell_categorie = function() {


            DB.gettable($scope.DB1, 'sys_ms_categorie').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.sell_categorie = res.resource;
                }


            })


        }
        $scope.Show_sell_categorie();

        $scope.Show_sell_brand = function() {


            DB.gettable($scope.DB1, 'sys_ms_brand').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.sell_brand = res.resource;
                }

                //console.log(JSON.stringify($scope.sell_brand));
            })


        }
        $scope.Show_sell_brand();





        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.showConfirmBack = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Cancel Listing',
                template: 'Are you sure you want to cancel your listing? Photos & details will not be saved.',
                cancelText: 'No', // String (default: 'Cancel'). The text of the Cancel button.
                cancelType: 'button button-clear button-positive', // String (default: 'button-default'). The type of the Cancel button.
                okText: 'Yes', // String (default: 'OK'). The text of the OK button.
                okType: 'button button-clear button-positive', // String (default: 'button-positive'). The type of the OK button.
            });

            confirmPopup.then(function(res) {
                if (res) {
                    $scope.myGoBack();
                } else {}
            });
        };
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Selling',
                template: 'Are you sure you want to selling?',
                cancelText: 'No', // String (default: 'Cancel'). The text of the Cancel button.
                cancelType: 'button-assertive', // String (default: 'button-default'). The type of the Cancel button.
                okText: 'Yes', // String (default: 'OK'). The text of the OK button.
                okType: 'button-assertive', // String (default: 'button-positive'). The type of the OK button.
            });

            confirmPopup.then(function(res) {
                if (res) {
                    window.location = "#/search/categorie/1";
                } else {}
            });
        };
        ionicMaterialInk.displayEffect();

        $scope.takePicture = function(index) {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI[index] = "data:image/jpeg;base64," + imageData;
                //alert(angular.toJson($scope.imgURI));
            }, function(err) {
                //alert(angular.toJson(err))
                // An error occured. Show a message to the user
            });

        }
           $scope.takeGallery = function(index) {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI[index] = "data:image/jpeg;base64," + imageData;
                //alert(angular.toJson($scope.imgURI));
            }, function(err) {
                //alert(angular.toJson(err))
                // An error occured. Show a message to the user
            });

        }

        $ionicModal.fromTemplateUrl('templates/modal/modal-sell-categorie.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_categorie = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal/modal-sell-brand.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_brand1 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal/modal-sell-desc.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_desc = modal;
        });
        $scope.SetmodalSellCategorie = function(u) {


            $scope.categorie1 = u;
            $scope.modal_categorie.hide();

            $scope.cat_value = u.split(',')[0];
            $scope.cat_name = u.split(',')[1];
            console.log(JSON.stringify($scope.cat_value + ',' + $scope.cat_name));


        };
        $scope.SetmodalSellBrand = function(u) {
            //  console.log(u);
            $scope.brand1 = u;
            $scope.modal_brand1.hide();

            $scope.brand_value = u.split(',')[0];
            $scope.brand_name = u.split(',')[1];
            console.log(JSON.stringify($scope.brand_value + ',' + $scope.brand_name));

        };
        $scope.SetmodalSellDesc = function(u) {
            console.log(angular.toJson(u));

            $scope.desc_name = u.name;
            $scope.desc_detail = u.desc;

            //$scope.modal_desc.hide();
        };




    })
.controller('myCtrl', ['fileUpload' ,'$scope', '$cordovaImagePicker', '$ionicModal', '$filter', '$ionicHistory', 'ionicMaterialInk', 'ionicMaterialMotion', 'DB','$http' ,function( fileUpload ,$scope, $cordovaImagePicker, $ionicModal, $filter, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, DB,$http) {
 $scope.login_user = JSON.parse(localStorage.getItem("user_login"));
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
 
           var uploadUrl = '/api/v2/files/img/';
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
                    "value": $scope.login_user[0].userid
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
               //alert(uploadUrl)
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