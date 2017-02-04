angular.module('starter.controllers_OfferCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('OfferCtrl', function(ionicMaterialInk, ionicMaterialMotion, $stateParams, $ionicHistory, $filter, DB, $scope, $firebaseArray) {
        $stateParams.id
        $stateParams.seller
        $stateParams.buyer
        $scope.Params_seller = $stateParams.seller
        $scope.Params_buyer = $stateParams.buyer
        $scope.Params_product = $stateParams.id
        $scope.chat_id = null;
        $scope.chat_pro_id = "";
        $scope.chat_by = "";
        $scope.chat_detail = "";
        $scope.aaa = "";
        $scope.chat_type = "";
        $scope.login = JSON.parse(localStorage.getItem("login"));
        $scope.product_chat = JSON.parse(localStorage.getItem('product_chat'));
        $scope.pro_status = "0";
        $scope.data_product1 = new Array();
        $scope.product_chat1 = new Array();
        $scope.pro_price = '';
            $scope.pro_like = '';
    $scope.pro_sell = '';
    $scope.pro_buy = '';
    $scope.pro_insert = '';
    $scope.pro_update = '';
    $scope.pro_accepted = '';
    $scope.pro_decline = '';

        $scope.show_chat = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.data_chat = res.resource;
                    $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id })[0];

                    //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                    //console.log(angular.toJson($scope.country));

                }
                console.log(JSON.stringify($scope.login_Params.userid));
            });


        }
        $scope.show_chat();
     
        $scope.Add_chat_data = function(e) {
            var ref = new Firebase("https://chatbrandname24.firebaseio.com/");
            // create a synchronized array
            // click on `index.html` above to see it used in the DOM!
            $scope.message = $firebaseArray(ref);
            /*$scope.Date1= new Date();
             alert($scope.Date1);*/


          if ($scope.Params_seller == $scope.login_Params.userid) {
            $scope.chat_type = 1;
            console.log($scope.Params_seller);
        } else {

            $scope.chat_type = 2;
        }


        // alert($scope.chat_type);
        $scope.message.$add({
            pro_id: $scope.Params_product,
            chat_by: $scope.login_Params.userid,
        
            chat_detail: 'Make an Offer '+''+ $scope.pro_price ,
            pro_offer: $scope.pro_price,
            chat_type: $scope.chat_type,
            chat_photo: $scope.login_Params.photo,
            chat_date: 2,

        });
        $scope.chat_detail = '';

        };
 $scope.Log_Data = function() {

      var ref = new Firebase("https://luminous-inferno-6016.firebaseio.com/");
            // create a synchronized array
            // click on `index.html` above to see it used in the DOM!
            $scope.list_data = $firebaseArray(ref);
        $scope.login = JSON.parse(localStorage.getItem("login"));
        //    console.log( $scope.login);


        console.log($scope.Params_seller + ',' + $scope.Params_product + ',' + $scope.Params_buyer);

        if ($scope.Params_seller == $scope.login_Params.userd) {
            $scope.chat_type = 1;
            console.log($scope.Params_seller);
        } else {

            $scope.chat_type = 2;
        }


        // alert($scope.chat_type);
        $scope.list_data.$add({
            log_by: $scope.login_Params.userid,
            log_to:($scope.chat_type!= 1 ? $scope.Params_seller : $scope.Params_buyer),
            pro_id: $scope.Params_product,
            pro_offer: $scope.pro_price,
            chat_detail: $scope.chat_detail,
            pro_like: $scope.pro_like,
            pro_insert: $scope.pro_insert,
            pro_update: $scope.pro_update,
            pro_accepted: $scope.pro_accepted,
            pro_decline: $scope.pro_decline,
            chat_photo: $scope.login_Params.photo,
            chat_type: $scope.chat_type,
        });
        $scope.chat_detail = '';
    }

        /*
                $scope.Add_chat_data = function() {
                    var add_chat = [{
                        "name": "in_chat_id",
                        "param_type": "IN",
                        "value": $scope.chat_id
                    }, {
                        "name": "in_pro_id",
                        "param_type": "IN",
                        "value": $scope.Params_product
                    }, {
                        "name": "in_chat_by",
                        "param_type": "IN",
                        "value": $scope.login_Params[0].face_id
                    }, {
                        "name": "in_chat_detail",
                        "param_type": "IN",
                        "value": 'Approved Offer:4000'
                    }, {
                        "name": "in_pro_offer",
                        "param_type": "IN",
                        "value": 4000
                    }, {
                        "name": "in_chat_type",
                        "param_type": "IN",
                        "value": '1'
                    }, ];
                    DB.sp_param($scope.DB1, 'shop_ms_chat', add_chat).then(function(res) {
                        //console.log(JSON.stringify(res));

                        if (res.resource !== undefined) {
                            $scope.chat_buy = res.resource;
                        }
                        //$scope.hide();        
                        console.log(JSON.stringify(add_chat));
                    })


                };*/


        $scope.Update_chat_status = function() {
          

            var data1 = [{
                    "name": "in_pro_id",
                    "param_type": "IN",
                    "value": $scope.Params_product
                }, {
                    "name": "in_pro_status",
                    "param_type": "IN",
                    "value": $scope.pro_status
                },

            ];
            DB.sp_param($scope.DB1, 'update_status_offer', data1).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.update_status = res.resource;

                }
                //$scope.hide();        
                console.log(JSON.stringify(data1));
            })


        };
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.myGoChat = function() {
            window.location = "#/search/chat";
        };
        ionicMaterialInk.displayEffect();
        /*setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
        */
        $scope.Show_Product_offer = function() {

            DB.gettable($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product_offer = res.resource;

                    $scope.pro_data = $filter('filter')($scope.product_offer , {pro_id : $scope.Params_product})[0];


                }
                //  console.log(JSON.stringify($scope.product_chat.pro_id));
            })


        }
        $scope.Show_Product_offer();

    })