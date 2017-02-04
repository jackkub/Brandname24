angular.module('starter.controllers_CategorieDetailCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])//'angularMoment',
    .controller('CategorieDetailCtrl', function($filter, DB, $scope, ionicMaterialInk, $stateParams, $ionicHistory, $ionicSlideBoxDelegate) {
           $stateParams.id
        $scope.categoriedetail = $stateParams.id
        $stateParams.seller
        $stateParams.buyer
        $scope.Params_seller = $stateParams.seller
        $scope.Params_buyer = $stateParams.buyer
        $scope.login = JSON.parse(localStorage.getItem("login"))
    //    $scope.login_id = $scope.login[0].userid
        $scope.product1 = new Array();
        $scope.color = '#C9C9C9';
   $scope.like_qut= [];
      $scope.like= [];
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
        //end moment time

$scope.get_user = function(){

            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {
                //console.log(JSON.stringify(res));
                /*  $scope.loading();*/
                if (res.resource !== undefined) {
                    $scope.user = res.resource;
                    $scope.login_id = $filter('filter')($scope.user ,{face_id :$scope.login.id })[0];
                }
                  //console.log(JSON.stringify($scope.categoriedetail +'-'+  $scope.Params_seller +'-'+  $scope.login_id.face_id))
                //console.log(JSON.stringify($scope.login_id.userid));
   $scope.chk_like();
            })


}
$scope.get_user();

$scope.get_product= function(){

            DB.gettable($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));
                /*  $scope.loading();*/
                if (res.resource !== undefined) {
                    $scope.product_list = res.resource;
                  //  $scope.login_id = $filter('filter')($scope.user ,{face_id :$scope.login.id })[0];
                }
                  //console.log(JSON.stringify($scope.categoriedetail +'-'+  $scope.Params_seller +'-'+  $scope.login_id.face_id))
                console.log(JSON.stringify($scope.product_list));
   
            })


}
$scope.get_product();

        $scope.Show_Product = function() {

            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.shop_ms_product as product join brandname24.sys_ms_user as user on product.pro_seller = user.userid where pro_id = "+$stateParams.id
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
                        if(v.pro_id == $stateParams.id){
                            $scope.product1.push({
                                pro_id: v.pro_id,
                                pro_name: v.pro_name,
                                cat_id: v.cat_id,
                                bra_id: v.bra_id,
                                pro_detail: v.pro_detail,
                                pro_price: v.pro_price,
                                pro_sharing: v.pro_sharing,
                                pro_photo1: $scope.server+":"+$scope.port+"/api/v2/files/img/"+ v.pro_photo.split(',')[0]+"?api_key="+$scope.api_key,
                                pro_photo2: $scope.server+":"+$scope.port+"/api/v2/files/img/"+ v.pro_photo.split(',')[1]+"?api_key="+$scope.api_key,
                                pro_photo3: $scope.server+":"+$scope.port+"/api/v2/files/img/"+ v.pro_photo.split(',')[2]+"?api_key="+$scope.api_key,
                                pro_photo4: $scope.server+":"+$scope.port+"/api/v2/files/img/"+ v.pro_photo.split(',')[3]+"?api_key="+$scope.api_key,
                                pro_seller: v.pro_seller,
                                pro_like: v.pro_like,
                                pro_share: v.pro_share,
                                sys_rec_datetime: v.sys_rec_datetime,
                                pro_status: v.pro_status,
                                seller_name : v.username,
                                seller_join : v.sys_rec_datetime,
                                seller_photo : v.photo
                            })
                                    //     console.log(JSON.stringify(seller_photo))
                        }
                        //console.log(JSON.stringify($scope.product[0].pro_photo.split(',')[0])) 
                    })
                }
 //console.log(JSON.stringify( $scope.product)) 
            })
        }
        $scope.Show_Product();

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        // Like Product By User
        $scope.btn_like = function(){

            var data = [{
                    "name": "par_product_id",
                    "param_type": "IN",
                    "value": $stateParams.id
                }, {
                    "name": "par_userid",
                    "param_type": "IN",
                    "value": $scope.login_id.userid
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
                 $scope.like_count();
            });
        };

        //Check Like Product
        $scope.chk_like = function () {
            // body...

            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.shop_ms_detail where pro_rec_by ='"+$scope.login_id.userid + "' and pro_id='"+$scope.categoriedetail+"'"
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

           // console.log(JSON.stringify(data))
            DB.sp_param($scope.DB1, 'SP_DB_TB_JOIN', data).then(function(res) {
              //  console.log(JSON.stringify(res));
                if (res.resource.length !== 0) {
                    if(res.resource[0].pro_id == $stateParams.id){
                        $scope.color = '#FF5656';

                       //console.log(res.resource[0].pro_id)
                    }
                    // console.log(res.resource)
                }

            });
        };
    
 $scope.like_count = function () {
    
             var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.shop_ms_product as pro left join brandname24.shop_ms_detail as detail on pro.pro_id = detail.pro_id group by pro.pro_id;"
                }, {
                    "name": "PAR_DB_FIELD",
                    "param_type": "IN",
                    "value": "pro.pro_id,count(detail.pro_id) as like_pro"
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

                if (res.resource != undefined) {
                    $scope.like = res.resource ; 
                    $scope.like_qut = $filter('filter')($scope.like,{pro_id : $scope.categoriedetail})[0]
              
               /*     angular.forEach($scope.like, function(v, k) {
                        $scope.like_qut.push(res.resource[k].like_pro);
                             console.log(JSON.stringify($scope.like_qut));
                    })*/
               
                }
                console.log(JSON.stringify($scope.like_qut));
            });
        }
        $scope.like_count();
    })