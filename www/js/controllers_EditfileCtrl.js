angular.module('starter.controllers_EditfileCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('EditProfileCtrl', function($scope, $cordovaImagePicker, $ionicModal, $filter, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, DB) {
        $scope.country = null;
        $scope.region = null;
        $scope.par_country = null;
        $scope.par_region = null;
        $scope.login = null;
        $scope.login = JSON.parse(localStorage.getItem("login"));
        $scope.pro_username = '';
        $scope.faceid = '';
        $scope.pro_photo = '';
        $scope.pro_firstname = '';
        $scope.pro_lastname = '';
        $scope.pro_gender = '';
        $scope.pro_gender = '';
        $scope.pro_region_id = '';
        $scope.pro_birthday = '';
        $scope.pro_email = '';
        $scope.pro_mobile = '';

        //var d = $scope.login.birthday.split('/');
        // $scope.login.birthday = new Date(parseInt(d[2]), parseInt(d[0]) - 1, parseInt(d[1]));
        $scope.setProfile = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    var profile = res.resource;
                    $scope.login = $filter('filter')(profile, { face_id: $scope.login.id });
                    $scope.faceid = $scope.login.face_id;
                    $scope.pro_photo = $scope.login.pro_photo;
                    $scope.pro_username = $scope.login.username;
                    $scope.pro_firstname = $scope.login.firstname;
                    $scope.pro_lastname = $scope.login.lastname;
                    $scope.pro_gender = $scope.login.gender;
                    $scope.pro_region_id = $scope.login.region_id;
                    $scope.pro_birthday = $scope.login.birthda;
                    $scope.pro_email = $scope.login.email;
                    $scope.pro_mobile = $scope.login.mobile;

                    /*     if (login !== undefined) {
                                var json = {
                                    'profile':   $scope.pro_photo,
                                    'email':  $scope.pro_email,
                                    'displayName':  $scope.pro_username,
                                    'mobile':   $scope.pro_mobile,
                                    'id': $scope.faceid,
                                    'name': $scope.pro_firstname,
                                    'first_name':  $scope.pro_firstname,
                                    'last_name':  $scope.pro_lastname,
                                    'gender':  $scope.pro_gender,
                                    'location': $scope.pro_region_id,
                                     'birthday':  ,
                                };
                                $scope.login = json;

                            }*/

                    console.log(JSON.stringify());
                    //console.log(angular.toJson($scope.country));

                }
                //console.log(JSON.stringify($scope.list));
            });


        }

        $scope.setCoutry = function() {
            // $scope.loading();
            DB.gettable($scope.DB1, 'user_ms_country').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.country = res.resource;
                    //console.log(angular.toJson($scope.country));

                }
                //console.log(JSON.stringify($scope.list));
            });
        }
        $scope.setRegion = function() {
            //$scope.loading();
            DB.gettable($scope.DB1, 'user_ms_region').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.region = res.resource;
                }
                //   console.log(JSON.stringify($scope.list));
            });
        }
        $scope.setCoutry();
        setTimeout(function() { $scope.setRegion(); }, 1000);

        $scope.setProfile();


        $scope.changeimage = function() {
            var options = {
                maximumImagesCount: 10,
                width: 800,
                height: 800,
                quality: 80
            };
            $cordovaImagePicker.getPictures(options)
                .then(function(results) {
                    for (var i = 0; i < results.length; i++) {
                        console.log('Image URI: ' + results[i]);
                    }
                }, function(error) {
                    // error getting photos
                });

        };
        $scope.changelocation = function() {
            $scope.modal_country.show();

        }
        $ionicModal.fromTemplateUrl('templates/modal/modal-country.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_country = modal;
        });
        $ionicModal.fromTemplateUrl('templates/modal/modal-region.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_region = modal;
        });
        $scope.SetmodalCountry = function(u) {
            $scope.par_country = u;
            $scope.country_id = parseInt($scope.par_country.split(',')[0]);
            $scope.login.location = $scope.country_id + " , ";
            $scope.country_name = $scope.par_country.split(',')[1];
            $scope.login.location1 = $scope.country_name + " , ";

            $scope.modal_country.hide();
            $scope.modal_region.show();

            console.log(JSON.stringify($scope.login.location1));


        };
        $scope.SetmodalRegion = function(u) {
            $scope.par_region = u;
            $scope.region_id = $scope.par_region.split(',')[0];
            $scope.region_name = $scope.par_region.split(',')[1];
            $scope.login.location1 += $scope.par_region.split(',')[1];
            $scope.login.location += $scope.par_region.split(',')[0];

            $scope.modal_region.hide();
            console.log(JSON.stringify($scope.login.location1));
        };
        ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();



        $scope.save_edit_user = function() {


            var data4 = [{
                    "name": "in_userid",
                    "param_type": "IN",
                    "value": $scope.login[0].userid
                }, {
                    "name": "in_face_id",
                    "param_type": "IN",
                    "value": $scope.login[0].face_id
                }, {
                    "name": "in_username",
                    "param_type": "IN",
                    "value": $scope.login[0].username
                }, {
                    "name": "in_firstname",
                    "param_type": "IN",
                    "value": $scope.login[0].firstname
                }, {
                    "name": "in_lastname",
                    "param_type": "IN",
                    "value": $scope.login[0].lastname
                }, {
                    "name": "in_photo",
                    "param_type": "IN",
                    "value": $scope.login[0].photo
                }, {
                    "name": "in_region_id",
                    "param_type": "IN",
                    "value": /*$scope.country_id +','+$scope.region_id*/ $scope.login.location
                }, {
                    "name": "in_email",
                    "param_type": "IN",
                    "value": $scope.login[0].email
                }, {
                    "name": "in_mobile",
                    "param_type": "IN",
                    "value": $scope.login[0].mobile
                }, {
                    "name": "in_birthday",
                    "param_type": "IN",
                    "value": moment($scope.login[0].birthday).format('YYYY-MM-DD')

                }, {
                    "name": "in_gender",
                    "param_type": "IN",
                    "value": $scope.login[0].gender
                }, {
                    "name": "in_device_token",
                    "param_type": "IN",
                    "value": null
                }, {
                    "name": "in_device_os",
                    "param_type": "IN",
                    "value": null
                }, {
                    "name": "in_device_version",
                    "param_type": "IN",
                    "value": null
                },



            ];
            DB.sp_param($scope.DB1, 'sys_ms_user', data4).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.user_edit = res.resource;
                }
                //$scope.hide();        
                console.log(JSON.stringify($scope.login.location));
            })


        }


    })



