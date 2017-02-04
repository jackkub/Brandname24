angular.module('starter.controllers_CategorieCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
   .controller('CategorieCtrl', function(DB, $scope, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $stateParams,$filter) {

        //Get Userid localstorage
        $scope.login = JSON.parse(localStorage.getItem("login"))
        //$scope.login_id = $scope.login[0].userid
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
        $scope.like =[];
  $scope.like_qut = [];
$scope.login_id  = '' ;
$scope.get_user = function(){

            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {
                //console.log(JSON.stringify(res));
                /*  $scope.loading();*/
                if (res.resource !== undefined) {
                    $scope.user = res.resource;
                    $scope.listlogin_id = $filter('filter')($scope.user ,{face_id :$scope.login.id })[0];
                    $scope.login_id =  $scope.listlogin_id.userid ;
                }

                console.log(JSON.stringify($scope.login_id));
$scope.Show_Product();
    /* $scope.chk_like();*/
            })


}
$scope.get_user();

        $scope.Show_Product = function() {
   // console.log(JSON.stringify($scope.login_id));
            var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.shop_ms_product as product left join brandname24.shop_ms_detail as user on product.pro_id = user.pro_id and pro_rec_by = "+$scope.login_id
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
                   console.log($scope.like);
                }
            })
        }
     
        $scope.btn_like = function(pro_id,index){
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
                    /// set like
                    if ($scope.like[index] == '#C9C9C9') { //pink --
                        $scope.like[index] = '#FF5656';
                        $scope.like_qut[index] += 1;

                    }else{
                        $scope.like[index] = '#C9C9C9'; //pink ++
                        $scope.like_qut[index] -= 1;
                    }
                }
            });
                
   
            
       $scope.like_count();
        };

       $scope.like_count = function () {
            // body...
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
                    $scope.like1 = res.resource ; 
                    angular.forEach($scope.like1, function(v, k) {
                        $scope.like_qut.push(res.resource[k].like_pro);
                    })
               
                }
                console.log(JSON.stringify($scope.like_qut));
            });
        }
        $scope.like_count();


        $scope.myGoBack = function() {
            alert('go back');
            $ionicHistory.goBack();
        };
    })