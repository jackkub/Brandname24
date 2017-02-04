angular.module('starter.controllers_LoginCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
    .controller('LoginCtrl', function($scope, ionicMaterialInk, $state, $cordovaOauth, FireBase, DB) {
        var Authen = FireBase.Authen();
        var login = null;
        ionicMaterialInk.displayEffect();
        $scope.login = function() {


            Authen.$authWithOAuthPopup("facebook", function(authData) {
                login = {
                    'profile': authData.facebook.profileImageURL,
                    'email': authData.facebook.email,
                    'displayName': authData.facebook.displayName.replace(' ', '.'),
                    'mobile': null,
                    'id': authData.facebook.cachedUserProfile.id,
                    'name': authData.facebook.name,
                    'first_name': authData.facebook.cachedUserProfile.first_name,
                    'last_name': authData.facebook.cachedUserProfile.last_name,
                    'gender': authData.facebook.cachedUserProfile.gender,
                    'location': authData.facebook.cachedUserProfile.location.name,
                    'birthday': authData.facebook.cachedUserProfile.birthday,
                    'datetimerec': moment().format('YYYY-MM-DD')


                };


                if (localStorage.getItem("login") == null) {
                    localStorage.setItem("login", JSON.stringify(login))
                    $scope.chk_user(authData.facebook.cachedUserProfile.id);

                }
                $state.go('app.browse');

            }, {
                scope: "email,user_birthday,user_location,user_about_me" // the permissions requested
            }).catch(function(error) {
                console.log("Login Failed!", JSON.stringify(error));
            });



            /*
             Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
                 // User successfully logged in
                 $state.go('app.browse');

             }).catch(function(error) {
                 console.log(JSON.stringify(error))
                 if (error.code === "TRANSPORT_UNAVAILABLE") {
                     Auth.$authWithOAuthPopup("facebook").then(function(authData) {
                         // User successfully logged in. We can log to the console
                         // since we’re using a popup here
                         console.log('Authen ' + JSON.stringify(authData));

                     });
                 } else {
                     // Another error occurred
                     console.log('Authen error = ' + error);
                     alert('Authen error = ' + error)
                 }
             });
             */

        };
        $scope.logout = function() {

                localStorage.removeItem("login")
                FireBase.UnAuthen();

            }
            //$scope.logout();
        Authen.$onAuth(function(authData) {
            if (authData === null) {
                console.log('not yet login')
                    //alert('not yet login')
            } else {
                $scope.authData = null;
                $scope.authData = authData; // This will display the user's name in our view
                // console.log(JSON.stringify( $scope.authData));
                login = {
                    'profile': authData.facebook.profileImageURL,
                    'email': authData.facebook.email,
                    'mobile': null,
                    'displayName': authData.facebook.displayName.replace(' ', '.'),
                    'id': authData.facebook.cachedUserProfile.id,
                    'name': authData.facebook.name,
                    'first_name': authData.facebook.cachedUserProfile.first_name,
                    'last_name': authData.facebook.cachedUserProfile.last_name,
                    'gender': authData.facebook.cachedUserProfile.gender,
                    'location': authData.facebook.cachedUserProfile.location,
                    'birthday': authData.facebook.cachedUserProfile.birthday,
                    'datetimerec': moment().format('YYYY-MM-DD, HH:mm:ss')
                };

                    if(authData.facebook.cachedUserProfile.gender == 'male'){
                            authData.facebook.cachedUserProfile.gender = 'M' ; 

                    }else{
                        authData.facebook.cachedUserProfile.gender = 'F' ;
                    }
                var data6 = [{
                        "name": "in_userid",
                        "param_type": "IN",
                        "value": null
                    }, {
                        "name": "in_face_id",
                        "param_type": "IN",
                        "value": authData.facebook.cachedUserProfile.id
                    }, {
                        "name": "in_username",
                        "param_type": "IN",
                        "value": authData.facebook.displayName.replace(' ', '.')
                    }, {
                        "name": "in_firstname",
                        "param_type": "IN",
                        "value": authData.facebook.cachedUserProfile.first_name
                    }, {
                        "name": "in_lastname",
                        "param_type": "IN",
                        "value": authData.facebook.cachedUserProfile.last_name
                    }, {
                        "name": "in_photo",
                        "param_type": "IN",
                        "value": authData.facebook.profileImageURL
                    }, {
                        "name": "in_region_id",
                        "param_type": "IN",
                        "value": authData.facebook.cachedUserProfile.location
                    }, {
                        "name": "in_email",
                        "param_type": "IN",
                        "value": authData.facebook.email
                    }, {
                        "name": "in_mobile",
                        "param_type": "IN",
                        "value": null
                    }, {
                        "name": "in_birthday",
                        "param_type": "IN",
                        "value": authData.facebook.cachedUserProfile.birthday
                    }, {
                        "name": "in_gender",
                        "param_type": "IN",
                        "value": authData.facebook.cachedUserProfile.gender
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
                DB.sp_param($scope.DB1, 'sys_ms_user', data6).then(function(res) {
                        //console.log(JSON.stringify(res));

                        if (res.resource !== undefined) {
                            $scope.usr_login = res.resource;
                        }
                        console.log(JSON.stringify($scope.usr_login))
                    })
                    //Login.SetLogin(login);
                if (localStorage.getItem("login") == null) {
                    localStorage.setItem("login", JSON.stringify(login))
                    $scope.chk_user(authData.facebook.cachedUserProfile.id);
                }
                $state.go('app.browse');
                //alert('go to Browse Page !!')
            }
        });
        // Fisht Check User Login Save LocalStorage
        $scope.chk_user = function (par_id) {
            // body...

             var data = [{
                    "name": "PAR_DB_TABLE",
                    "param_type": "IN",
                    "value": "brandname24.sys_ms_user where face_id ="+par_id
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

                if (res.resource !== undefined) {
                    $scope.user_login = res.resource;
                    localStorage.setItem('user_login',JSON.stringify($scope.user_login));
                    console.log(JSON.parse(localStorage.getItem("user_login")));
                }
            });
        }

    })