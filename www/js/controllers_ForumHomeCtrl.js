angular.module('starter.controllers_ForumHomeCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('ForumHomeCtrl', function(DB, $filter, $stateParams, $scope, $ionicModal, $ionicHistory, ionicMaterialInk, ionicMaterialMotion) {
        $stateParams.id
        $scope.forum_params = $stateParams.id
        $scope.login = null;
        $scope.login_user = JSON.parse(localStorage.getItem("user_login"));
        $scope.login = JSON.parse(localStorage.getItem("login"));
        $scope.modal_new = "";
        $scope.modal_categorie12 = "";
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        ionicMaterialInk.displayEffect();
        $scope.forum = {};
        $scope.project = {

            description: 'Nuclear Missile Defense System',
            rate: 500
        };
        $ionicModal.fromTemplateUrl('templates/forum/modal-new.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_new = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal/modal-categorie.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_categorie12 = modal;
        });
        $scope.SetmodalCategorie = function(u) {
            console.log(u);
            $scope.cat_id = u.split(',')[0];
            $scope.cat_name = u.split(',')[1];
            $scope.modal_categorie12.hide();
            /*$scope.data1 = $filter('filter')( $scope.search_categorie,{cat_id :$scope.product.cat_id })[0];
            $scope.pro_id = $scope.data1.pro_id ;
            $scope.categorie12= $scope.data1.cat_id ;*/
            console.log(JSON.stringify($scope.cat_name));
        };
        $scope.SetmodalNewTopic = function(u) {

            $scope.forum = u;
            $scope.cat_name;
            $scope.categorie12;
            console.log(JSON.stringify(u));
        };
        $scope.SaveNewTopic = function() {
            console.log(angular.toJson($scope.forum));
            $scope.modal_new.hide();
            $scope.forum = {};
            // console.log(JSON.stringify($scope.forum));
        }
        $scope.ShowModal = function() {
            $scope.modal_new.show();
        }

        $scope.Show_Product = function() {

            DB.gettable($scope.DB1, 'sys_ms_forum').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.forum = res.resource;
                }
                //console.log(JSON.stringify($scope.forum));

            })


        }
        $scope.Show_Product();

        $scope.Show_Categorie = function() {


            DB.gettable($scope.DB1, 'sys_ms_categorie').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.search_categorie = res.resource;
                }

                //  console.log(JSON.stringify($scope.search_categorie));
            })


        }
        $scope.Show_Categorie();

        $scope.setProfile = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.profile_forum = res.resource;

                }
                // console.log(JSON.stringify( $scope.data5.photo ));
            });


        }
        $scope.setProfile();



        $scope.show_forum = function() {

            DB.gettable($scope.DB1, 'sys_ms_forum').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.forum = res.resource;
                    $scope.data5 = $filter('filter')($scope.forum, { forum_by: $scope.profile_forum.userid });

                   /* $scope.forum1*/
                    $scope.forum_by = $scope.data5.forum_by;

                }
                // console.log(JSON.stringify(  $scope.data5));
            });


        }
        $scope.show_forum();

        $scope.show_forum_data = function() {

            //  $scope.loading();
            DB.sp_param($scope.DB1, 'user_join_forum').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.join_data = res.resource;

                }
                //console.log(JSON.stringify( $scope.join_data ));
            });

        }
        $scope.show_forum_data();

        $scope.SaveNewTopic = function() {

            var data = [{
                    "name": "in_forum_id",
                    "param_type": "IN",
                    "value": null
                }, {
                    "name": "in_forum_title",
                    "param_type": "IN",
                    "value": $scope.forum.title
                }, {
                    "name": "in_forum_body",
                    "param_type": "IN",
                    "value": $scope.forum.body
                },

                {
                    "name": "in_cat_id",
                    "param_type": "IN",
                    "value": $scope.forum_params
                }, {
                    "name": "in_forum_by",
                    "param_type": "IN",
                    "value": $scope.login_user[0].userid
                },



            ];
            DB.sp_param($scope.DB1, 'sys_ms_forum', data).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.add_forum = res.resource;
                }
             $scope.Show_Categorie();   
                console.log(JSON.stringify(data));
            })

        }
            $ionicModal.fromTemplateUrl('templates/forum/modal-forum-categorie.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_categorie = modal;
        });
       $scope.SetmodalSellCategorie = function(u) {


            $scope.categorie1 = u;
            $scope.modal_categorie.hide();

            $scope.cat_value = u.split(',')[0];
            $scope.cat_name = u.split(',')[1];
            console.log(JSON.stringify($scope.cat_value + ',' + $scope.cat_name));


        };

    })