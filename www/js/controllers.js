angular.module('starter.controllers', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
    .controller('AppCtrl', function($scope) {
        $scope.thisactive = [false, false, false, false];


        $scope.ClickActive = function(index) {

            if (index == 0) {
                $scope.thisactive[0] = true;
                $scope.thisactive[1] = false;
                $scope.thisactive[2] = false;
                $scope.thisactive[3] = false;
            } else if (index == 1) {
                $scope.thisactive[0] = false;
                $scope.thisactive[1] = true;
                $scope.thisactive[2] = false;
                $scope.thisactive[3] = false;
            } else if (index == 2) {
                $scope.thisactive[0] = false;
                $scope.thisactive[1] = false;
                $scope.thisactive[2] = true;
                $scope.thisactive[3] = false;
            } else if (index == 3) {
                $scope.thisactive[0] = false;
                $scope.thisactive[1] = false;
                $scope.thisactive[2] = false;
                $scope.thisactive[3] = true;
            }
        }
        $scope.ClickActive(0);
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;

    })
    .controller('DashCtrl', function($scope) {})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })



    /*.controller('LoginCtrl', function($scope, ionicMaterialInk, $state, $cordovaOauth, FireBase, DB) {
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
                        //$scope.hide();        
                        //  console.log(JSON.stringify(data6));
                    })
                    //Login.SetLogin(login);
                if (localStorage.getItem("login") == null) {
                    localStorage.setItem("login", JSON.stringify(login))



                }
                $state.go('app.browse');
                //alert('go to Browse Page !!')
            }




        });

    })*/
   /* .controller('BrowseCtrl', function($scope, DB, ionicMaterialInk, ionicMaterialMotion) {
        ionicMaterialInk.displayEffect();
        $scope.categorie = null;
        ionicMaterialInk.displayEffect();
        $scope.GetCategorie = function() {
            $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_categorie').then(function(res) {
                //  console.log($scope.DB1);
                if (res.resource !== undefined) {
                    $scope.categorie = res.resource;
                    //  console.log(angular.toJson($scope.categorie));

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
        
    })*/
    /*.controller('ProfileCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion) {


        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.fadeSlideIn();
        $scope.login = JSON.parse(localStorage.getItem("login"));
        $scope.color = ['#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9'];
        $scope.count_like = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.ClickLike = function(index) {
            if ($scope.color[index] == '#C9C9C9') {
                $scope.count_like[index] += 1;
                $scope.color[index] = '#FF5656';
            } else {
                $scope.count_like[index] -= 1;
                $scope.color[index] = '#C9C9C9';
            }



        }
    })*/
 /*   .controller('EditProfileCtrl', function($scope, $cordovaImagePicker, $ionicModal, $filter, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, DB) {
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

                            }

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
                    "value": $scope.country_id +','+$scope.region_id $scope.login.location
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


*/
/*.controller('SettingCtrl', function($scope, $state, ionicMaterialInk, ionicMaterialMotion, $ionicModal, $ionicHistory, FireBase) {

        $scope.logout = function() {
            var Authen = FireBase.Authen();
            localStorage.removeItem("login")
            Authen.$unauth();

            $state.go('login');
            window.location.reload();

        }
        ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $ionicModal.fromTemplateUrl('templates/modal/modal-share.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_share = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal/modal-notification.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal_notification = modal;
        });

        $scope.SetmodalShare = function(u) {
            //console.log(u);
            $scope.modal_share.hide();
        };
        $scope.SetmodalNotification = function(u) {
            $scope.modal_notification.hide();
        };

    })
    .controller('StuffLikeCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion) {
        $scope.color = ['#FF5656', '#FF5656', '#FF5656', '#FF5656', '#FF5656', '#FF5656', '#FF5656', '#FF5656', '#FF5656', '#FF5656'];
        $scope.count_like = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();

        $scope.ClickLike = function(index) {
            if ($scope.color[index] == '#C9C9C9') {
                $scope.count_like[index] += 1;
                $scope.color[index] = '#FF5656';
            } else {
                $scope.count_like[index] -= 1;
                $scope.color[index] = '#C9C9C9';
            }



        }
    })*/
    /*.controller('FollowersCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion) {
        //ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();
        $scope.follow = [1, 1];
        $scope.text_following = ["Following", "Following"];
        $scope.CheckFollowing = function(index) {
            $scope.class_follow = ["button button-block button-dark", "button button-block button-dark"];
            if ($scope.follow[index] == 1) {
                $scope.follow[index] = 0;
                $scope.class_follow[index] = "button button-block button-positive";
                $scope.text_following[index] = "Follow";
            } else if ($scope.follow[index] == 0) {
                $scope.follow[index] = 1;
                $scope.class_follow[index] = "button button-block button-dark";
                $scope.text_following[index] = "Following";
            }

        }
        $scope.CheckFollowing();

    })*/
   /* .controller('FollowingCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion) {
        //ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();

        $scope.follow = [1, 1];
        $scope.text_following = ["Following", "Following"];
        $scope.CheckFollowing = function(index) {
            $scope.class_follow = ["button button-block button-dark", "button button-block button-dark"];
            if ($scope.follow[index] == 1) {
                $scope.follow[index] = 0;
                $scope.class_follow[index] = "button button-block button-positive";
                $scope.text_following[index] = "Follow";
            } else if ($scope.follow[index] == 0) {
                $scope.follow[index] = 1;
                $scope.class_follow[index] = "button button-block button-dark";
                $scope.text_following[index] = "Following";
            }

        }
        $scope.CheckFollowing();
    })*/
/*    .controller('OfferMadeCtrl', function(DB,$scope, ionicMaterialInk, ionicMaterialMotion,$firebaseArray) {
        //ionicMaterialInk.displayEffect();
        //ionicMaterialMotion.fadeSlideIn();
 $scope.login = JSON.parse(localStorage.getItem("login"));
        
        // create a synchronized array
    

// usersRef now refers to the 'users' database location
    /*    $scope.message = new firebase(firebaseUrl).child('chatbrandname24');


    
    })*/
   /* .controller('SearchCtrl', function(DB, $scope, $state, $ionicHistory, ionicMaterialInk, $ionicModal) {
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
            $scope.categorie12= $scope.data1.cat_id ;
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
}
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

            ];
            DB.sp_param($scope.DB1, 'filter_orderby', data1).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.shop_orderby = res.resource;

                }
                //$scope.hide();        
                console.log(JSON.stringify(data1));
            })



        }



        /*setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
        

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



    })*/
  /*  .controller('FollowingMainCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion) {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();

    })*/
   /* .controller('CategorieCtrl', function(DB, $scope, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $stateParams) {
        $scope.color = ['#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9', '#C9C9C9'];
        $scope.count_like = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();

        $scope.Show_Product = function() {

            DB.gettable($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));
                /*  $scope.loading();
                if (res.resource !== undefined) {
                    $scope.product = res.resource;

                }
                //console.log(JSON.stringify($scope.product));

            })


        }
        $scope.Show_Product();

        $scope.myGoBack = function() {
            alert('go back');
            $ionicHistory.goBack();
        };
        $scope.ClickLike = function(index) {
                if ($scope.color[index] == '#C9C9C9') {
                    $scope.count_like[index] += 1;
                    $scope.color[index] = '#FF5656';
                } else {
                    $scope.count_like[index] -= 1;
                    $scope.color[index] = '#C9C9C9';
                }



            }
            /*setTimeout(function() {
                ionicMaterialMotion.ripple();
            }, 500);
            
    })*/
   /* .controller('CategorieDetailCtrl', function($filter, DB, $scope, ionicMaterialInk, $stateParams, $ionicHistory, $ionicSlideBoxDelegate) {
        $stateParams.id
        $scope.categoriedetail = $stateParams.id
            //$stateParams.id
        $stateParams.seller
        $stateParams.buyer
        $scope.Params_seller = $stateParams.seller
        $scope.Params_buyer = $stateParams.buyer
        $scope.Params_product = $stateParams.id
        $scope.login = JSON.parse(localStorage.getItem("login"));
        ionicMaterialInk.displayEffect();
        $scope.product1 = new Array();
        $scope.show_chat = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.data_chat = res.resource;
                    $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                    //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                    //console.log(angular.toJson($scope.country));

                }
                console.log(JSON.stringify($scope.Params_product));
            });


        }
        $scope.show_chat();
        $scope.Show_Product = function() {

            DB.gettable($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product = res.resource;

                    angular.forEach($scope.product, function(v, k) {
                        $scope.product1.push({

                                pro_id: v.pro_id,
                                pro_name: v.pro_name,
                                cat_id: v.cat_id,
                                bra_id: v.bra_id,
                                pro_detail: v.pro_detail,
                                pro_price: v.pro_price,
                                pro_sharing: v.pro_sharing,
                                pro_photo1: v.pro_photo.split(',')[0],
                                pro_photo2: v.pro_photo.split(',')[1],
                                pro_photo3: v.pro_photo.split(',')[2],
                                pro_photo4: v.pro_photo.split(',')[3],
                                pro_seller: v.pro_seller,
                                pro_like: v.pro_like,
                                pro_share: v.pro_share,
                                sys_rec_datetime: v.sys_rec_datetime,
                                pro_status: v.pro_status




                            })
                            //    console.log(JSON.stringify($scope.product1[k].pro_photo1));

                    })

                }
            })


        }
        $scope.Show_Product();

        $scope.startApp = function() {
            $state.go('main');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
    })*/
    /*.controller('ChatCtrl', function($window, $scope, $filter, $rootScope, $state, $stateParams, $ionicActionSheet,
        $ionicPopup, $ionicScrollDelegate, $timeout, $interval, ionicMaterialInk, MockService, DB, $firebaseArray) {
        ionicMaterialInk.displayEffect();
        $stateParams.id
        $stateParams.seller
        $stateParams.buyer
        $scope.Params_seller = $stateParams.seller
        $scope.Params_buyer = $stateParams.buyer
        $scope.Params_product = $stateParams.id
        $scope.login = JSON.parse(localStorage.getItem("login"));





        var ref = new Firebase("https://chatbrandname24.firebaseio.com/");
        // create a synchronized array
        // click on `index.html` above to see it used in the DOM!
        $scope.message = $firebaseArray(ref);


        $scope.addMessage = function(e) {
            console.log($scope.Params_seller + ',' + $scope.Params_product + ',' + $scope.Params_buyer);

            if ($scope.Params_seller == $scope.login_chat[0].face_id) {
                $scope.chat_type = 1;
                console.log($scope.Params_seller);
            } else {

                $scope.chat_type = 2;
            }


            alert($scope.chat_type);
            $scope.message.$add({
                pro_id: $scope.Params_product,
                chat_by: $scope.login_chat[0].face_id,
                chat_detail: $scope.chat_detail,
                pro_offer: 4000,
                chat_type: $scope.chat_type,
                chat_photo: $scope.login_chat[0].photo,
                chat_date: 2,

            });
            $scope.chat_detail = '';
        };


        $scope.show_chat = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.data_chat = res.resource;
                    $scope.login_chat = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                    //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                    //console.log(angular.toJson($scope.country));

                }
                console.log(JSON.stringify($scope.login_chat[0].face_id));
            });


        }
        $scope.show_chat();

        $scope.show_chat_data = function() {


            //  $scope.loading();
            DB.sp_param($scope.DB1, 'user_join_chat').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.chat_data = res.resource;
                    //  $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                    //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                    //console.log(angular.toJson($scope.country));

                }
                //- console.log(JSON.stringify($scope.chat_data));
            });
        }
        $scope.show_chat_data();

        $scope.show_join_user_porduct = function() {


            //  $scope.loading();
            DB.sp_param($scope.DB1, 'user_join_product').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.pro_data = res.resource;
                    //  $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                    //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                    //console.log(angular.toJson($scope.country));

                }
                // console.log(JSON.stringify($scope.pro_data));
            });
        }
        $scope.show_join_user_porduct();

        /*$scope.Add_chat_data = function() {
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
                      "value": $scope.login_chat[0].face_id
                  }, {
                      "name": "in_chat_detail",
                      "param_type": "IN",
                      "value": $scope.chat_detail
                  }, {
                      "name": "in_pro_offer",
                      "param_type": "IN",
                      "value": 4000
                  }, {
                      "name": "in_chat_type",
                      "param_type": "IN",
                      "value": '2'
                  }, ];
                  DB.sp_param($scope.DB1, 'shop_ms_chat', add_chat).then(function(res) {
                      //console.log(JSON.stringify(res));

                      if (res.resource !== undefined) {
                          $scope.chat_buy = res.resource;
                      }
                      //$scope.hide();        
                      console.log(JSON.stringify(add_chat));
                  })


              };

        $scope.reloadPage = function() { $window.location.reload(); }

        $scope.toUser = {
            _id: '534b8e5aaa5e7afc1b23e69b',
            pic: 'http://ionicframework.com/img/docs/venkman.jpg',
            username: 'Venkman'
        }

        // this could be on $rootScope rather than in $stateParams
        $scope.user = {
            _id: '534b8fb2aa5e7afc1b23e69c',
            pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
            username: 'Marty'
        };

        $scope.input = {
            message: localStorage['userMessage-' + $scope.toUser._id] || ''
        };

        var messageCheckTimer;

        var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
        var footerBar; // gets set in $ionicView.enter
        var scroller;
        var txtInput; // ^^^

        $scope.$on('$ionicView.enter', function() {
            console.log('UserMessages $ionicView.enter');

            getMessages();

            $timeout(function() {
                footerBar = document.body.querySelector('#userMessagesView .bar-footer');
                scroller = document.body.querySelector('#userMessagesView .scroll-content');
                txtInput = angular.element(footerBar.querySelector('textarea'));
            }, 0);

            messageCheckTimer = $interval(function() {
                // here you could check for new messages if your app doesn't use push notifications or user disabled them
            }, 20000);
        });

        $scope.$on('$ionicView.leave', function() {
            console.log('leaving UserMessages view, destroying interval');
            // Make sure that the interval is destroyed
            if (angular.isDefined(messageCheckTimer)) {
                $interval.cancel(messageCheckTimer);
                messageCheckTimer = undefined;
            }
        });

        $scope.$on('$ionicView.beforeLeave', function() {
            if (!$scope.input.message || $scope.input.message === '') {
                localStorage.removeItem('userMessage-' + $scope.toUser._id);
            }
        });

        function getMessages() {
            // the service is mock but you would probably pass the toUser's GUID here
            MockService.getUserMessages({
                toUserId: $scope.toUser._id
            }).then(function(data) {
                $scope.doneLoading = true;
                $scope.messages = data.messages;

                $timeout(function() {
                    viewScroll.scrollBottom();
                }, 0);
            });
        }

        $scope.$watch('input.message', function(newValue, oldValue) {
            console.log('input.message $watch, newValue ' + newValue);
            if (!newValue) newValue = '';
            localStorage['userMessage-' + $scope.toUser._id] = newValue;
        });

        $scope.sendMessage = function(sendMessageForm) {
            var message = {
                toId: $scope.toUser._id,
                text: $scope.input.message
            };

            // if you do a web service call this will be needed as well as before the viewScroll calls
            // you can't see the effect of this in the browser it needs to be used on a real device
            // for some reason the one time blur event is not firing in the browser but does on devices
            keepKeyboardOpen();

            //MockService.sendMessage(message).then(function(data) {
            $scope.input.message = '';

            message._id = new Date().getTime(); // :~)
            message.date = new Date();
            message.username = $scope.user.username;
            message.userId = $scope.user._id;
            message.pic = $scope.user.picture;

            $scope.messages.push(message);

            $timeout(function() {
                keepKeyboardOpen();
                viewScroll.scrollBottom(true);
            }, 0);

            $timeout(function() {
                $scope.messages.push(MockService.getMockMessage());
                keepKeyboardOpen();
                viewScroll.scrollBottom(true);
            }, 2000);

            //});
        };

        // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
        function keepKeyboardOpen() {
            console.log('keepKeyboardOpen');
            txtInput.one('blur', function() {
                console.log('textarea blur, focus back on it');
                txtInput[0].focus();
            });
        }

        $scope.onMessageHold = function(e, itemIndex, message) {
            console.log('onMessageHold');
            console.log('message: ' + JSON.stringify(message, null, 2));
            $ionicActionSheet.show({
                buttons: [{
                    text: 'Copy Text'
                }, {
                    text: 'Delete Message'
                }],
                buttonClicked: function(index) {
                    switch (index) {
                        case 0: // Copy Text
                            //cordova.plugins.clipboard.copy(message.text);

                            break;
                        case 1: // Delete
                            // no server side secrets here :~)
                            $scope.messages.splice(itemIndex, 1);
                            $timeout(function() {
                                viewScroll.resize();
                            }, 0);

                            break;
                    }

                    return true;
                }
            });
        };

        // this prob seems weird here but I have reasons for this in my app, secret!
        $scope.viewProfile = function(msg) {
            if (msg.userId === $scope.user._id) {
                // go to your profile
            } else {
                // go to other users profile
            }
        };

        // I emit this event from the monospaced.elastic directive, read line 480
        $scope.$on('taResize', function(e, ta) {
            console.log('taResize');
            if (!ta) return;

            var taHeight = ta[0].offsetHeight;
            console.log('taHeight: ' + taHeight);

            if (!footerBar) return;

            var newFooterHeight = taHeight + 10;
            newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

            footerBar.style.height = newFooterHeight + 'px';
            scroller.style.bottom = newFooterHeight + 'px';
        });
    })*/
   /* .controller('OfferCtrl', function(ionicMaterialInk, ionicMaterialMotion, $stateParams, $ionicHistory, $filter, DB, $scope, $firebaseArray) {
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


        $scope.show_chat = function() {
            //  $scope.loading();
            DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

                if (res.resource !== undefined) {
                    $scope.data_chat = res.resource;
                    $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                    //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                    //console.log(angular.toJson($scope.country));

                }
                console.log(JSON.stringify($scope.Params_product));
            });


        }
        $scope.show_chat();
        $scope.Add_chat_data = function(e) {
            var ref = new Firebase("https://chatbrandname24.firebaseio.com/");
            // create a synchronized array
            // click on `index.html` above to see it used in the DOM!
            $scope.message = $firebaseArray(ref);
            /*$scope.Date1= new Date();
             alert($scope.Date1);


            $scope.message.$add({
                pro_id: $scope.Params_product,
                chat_by: $scope.login_Params[0].face_id,
                chat_detail: 'Make an Offer' + '-' + $scope.aaa,
                pro_offer: $scope.aaa,
                chat_type: 2,
                chat_username: $scope.login_Params[0].username,
                chat_fistname: $scope.login_Params[0].firstname,
                chat_lastname: $scope.login_Params[0].lastname,
                chat_photo: $scope.login_Params[0].photo,



            })
            $scope.chat_detail = '';





        };


        
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


                };


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
        
        $scope.Show_Product_offer = function() {

            DB.gettable($scope.DB1, 'shop_ms_product').then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.product_offer = res.resource;




                }
                //  console.log(JSON.stringify($scope.product_chat.pro_id));
            })


        }
        $scope.Show_Product_offer();

    })*/
    /*.controller('SellCtrl', function(DB, $scope, ionicMaterialInk, ionicMaterialMotion, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, $cordovaCamera) {
        $scope.Add_sell = function() {

            var file = $scope.myFile;

            console.log('file is ');
            console.dir(file);

            var uploadUrl = "/api/v2/image/";
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




    })*/
   /* .controller('InboxCtrl', function($scope, $state, $ionicHistory, ionicMaterialInk, ionicMaterialMotion,$firebaseArray) {

        ionicMaterialInk.displayEffect();
        $scope.myGoBack = function() {
            $state.go('app.browse')
        };

   /*var rootRef  = new Firebase('https://chatbrandname24.firebaseio.com/');
   rootRef.child('chatbrandname24');
   $scope.msg = rootRef ;
    var ref = new Firebase("https://chatbrandname24.firebaseio.com/");
        // create a synchronized array
        // click on `index.html` above to see it used in the DOM!
        $scope.message = $firebaseArray(ref);


        $scope.addMessage = function(e) {
         

            $scope.message.$add({
                name: $scope.name,
               

            });
            console.log($scope.name)
            $scope.chat_detail = '';
        };
   




    })*/
    /*.controller('ForumCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $stateParams, DB) {
        ionicMaterialInk.displayEffect();
    })*/
   /* .controller('ForumHomeCtrl', function(DB, $filter, $stateParams, $scope, $ionicModal, $ionicHistory, ionicMaterialInk, ionicMaterialMotion) {
        $stateParams.id
        $scope.forum_params = $stateParams.id
        $scope.login = null;
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
            $scope.categorie12= $scope.data1.cat_id ;
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
                    $scope.data5 = $filter('filter')($scope.forum, { forum_by: $scope.profile_forum.face_id });

                    $scope.forum1
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
                    "value": $scope.cat_id
                }, {
                    "name": "in_forum_by",
                    "param_type": "IN",
                    "value": $scope.login[0].face_id
                },



            ];
            DB.sp_param($scope.DB1, 'sys_ms_forum', data).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.add_forum = res.resource;
                }
                //$scope.hide();        
                //console.log(JSON.stringify(data));
            })

        }

    })*/
   /* .controller('ForumDetailCtrl', function($scope, $ionicModal, ionicMaterialInk, ionicMaterialMotion) {
        ionicMaterialInk.displayEffect();
        $scope.forum = {};

    })*/
   /* .controller('myCtrl', ['$scope', 'fileUpload', 'DB', function($scope, fileUpload, DB) {

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


    }])*/
    /* .controller('MyController', function($scope, $firebase) {

      var ref = new Firebase("https://b24.firebaseio.com/");
      
      $scope.messages1 = $firebase(ref);
      
      $scope.addMessage = function(e) {
              if (e.keyCode != 13) return;
              $scope.messages1.$add({from: $scope.name, body: $scope.msg});
              $scope.msg1 = "";
       }
    })
         */
