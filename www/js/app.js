// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.controllers_LoginCtrl','starter.controllers_BrowseCtrl',
    'starter.controllers_ProfileCtrl','starter.controllers_EditfileCtrl','starter.controllers_SettingCtrl',
    'starter.controllers_FollowersCtrl','starter.controllers_FollowingCtrl','starter.controllers_OfferMadeCtrl',
    'starter.controllers_SearchCtrl','starter.controllers_FollowingMainCtrl','starter.controllers_CategorieCtrl',
    'starter.controllers_CategorieDetailCtrl','starter.controllers_ChatCtrl','starter.controllers_OfferCtrl',
    'starter.controllers_SellCtrl','starter.controllers_InboxCtrl','starter.controllers_ForumCtrl',
    'starter.controllers_ForumHomeCtrl','starter.controllers_ForumDetailCtrl', 'starter.services', 'firebase', 
    'ngCordova', 'ngCordovaOauth'])//,'angularMoment'

    .constant('INSTANCE_URL', 'http://203.154.162.180') //http://203.154.162.180
    .constant('INSTANCE_PORT', '80')
    .constant('DSP_API_KEY', '6498a8ad1beb9d84d63035c5d1120c007fad6de706734db9689f8996707e0f7d')
    .factory('httpInterceptor', function(INSTANCE_URL, INSTANCE_PORT) {
        return {
            request: function(config) { // Prepend instance url before every api call

                if (config.url.indexOf('/api/v2') > -1) { config.url = INSTANCE_URL + ':' + INSTANCE_PORT + config.url; };
                return config;
            }
        }
    })

    .run(function($ionicPlatform, $http, DSP_API_KEY, INSTANCE_URL, INSTANCE_PORT, $rootScope, $ionicLoading) {
       


        $rootScope.loading = function() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $rootScope.hide = function() {
            $ionicLoading.hide();
        };
        $rootScope.api_key = "8f0e37e6c5afe3e91686e84b1624188714cdd5142f301b38b55c0c4239afb311";
        $rootScope.server = INSTANCE_URL;
        $rootScope.port = INSTANCE_PORT;
        $rootScope.DB1 = "brandname24";
        $rootScope.DB2 = "";
        $http.defaults.headers.common['X-Dreamfactory-API-Key'] = DSP_API_KEY; 
        $ionicPlatform.ready(function() {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $cordovaInAppBrowserProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
    $ionicConfigProvider.views.transition('platform');
    var defaultOptions = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
    };

    document.addEventListener("deviceready", function() {

        $cordovaInAppBrowserProvider.setDefaultOptions(options)

    }, false);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive


        .state('app', {

            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('app.forum', {
            url: '/forum',
            views: {
                'forum': {
                    templateUrl: 'templates/forum.html',
                    controller: 'ForumHomeCtrl'
                },
                'forum-footer': {
                    template: '',
                }
            },
        })
        .state('app.forum-home', {
            url: '/forum_home/:id',
            views: {
                'forum': {
                    templateUrl: 'templates/forum-home.html',
                    controller: 'ForumHomeCtrl'
                },
                'forum-footer': {
                    template: '<button class="button button-dark button-fab button-fab-bottom-right" ng-click="modal_new.show()"><i class="icon ion-plus"></i></button>',
                    controller: 'ForumHomeCtrl'
                }
            },
        })
        .state('app.forum-detail', {
            url: '/forum_detail/:id',
            views: {
                'forum': {
                    templateUrl: 'templates/forum-detail.html',
                    controller: 'ForumDetailCtrl'
                },
                'forum-footer': {
                    template: '<div></div>'
                }
            }
        })
        .state('app.browse', {
            url: '/browse',
            views: {
                'browse': {
                    templateUrl: 'templates/browse.html',
                    controller: 'BrowseCtrl'
                },

            }
        })
        .state('app.profile', {
            url: '/profile/:id',
            views: {
                'profile': {
                    templateUrl: 'templates/profile.html',
                    controller: 'ProfileCtrl'
                },
            }
        })
        .state('app.followmain', {
            url: '/followmain',
            views: {
                'followmain': {
                    templateUrl: 'templates/following-main.html',
                    controller: 'FollowingMainCtrl'
                },
            },

        })

        .state('app.sell', {
            url: '/sell',
            views: {
                'sell': {
                    templateUrl: 'templates/sell.html',
                    controller: 'SellCtrl'
                },
                'sell-footer': {
                    template: '<button class="button button-assertive button-fab button-fab-bottom-right" ng-click="modal_new.show()"><i class="ion-ios-camera"></i></button>',
                    controller: 'SellCtrl'
                }
            }
        })
        .state('search', {
            url: '/search',
            abstract: true,
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl'
        })
        .state('search.categorie', {
            url: '/categorie/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/categorie.html',
                    controller: 'CategorieCtrl'
                },
                'fabContent': {
                    template: ''
                }
            },

        })

    .state('search.detail', {
            url: '/detail/:id/:seller',
            views: {
                'menuContent': {
                    templateUrl: 'templates/categorie_detail.html',
                    controller: 'CategorieDetailCtrl'
                },
                'fabContent': {
                    template: ''
                }
            },
            //controller: 'SearchCtrl'
        })
        .state('app.editprofile', {
            url: '/editprofile',
            views: {
                'profile': {
                    templateUrl: 'templates/editprofile.html',
                    controller: 'EditProfileCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.setting', {
            url: '/setting',
            views: {
                'profile': {
                    templateUrl: 'templates/setting.html',
                    controller: 'SettingCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.stufflike', {
            url: '/stufflike',
            views: {
                'profile': {
                    templateUrl: 'templates/stufflike.html',
                    controller: 'StuffLikeCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.following', {
            url: '/following',
            views: {
                'profile': {
                    templateUrl: 'templates/following.html',
                    controller: 'FollowingCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.followers', {
            url: '/followers',
            views: {
                'profile': {
                    templateUrl: 'templates/followers.html',
                    controller: 'FollowersCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.offermade', {
            url: '/offermade',
            views: {
                'profile': {
                    templateUrl: 'templates/offermade.html',
                    controller: 'OfferMadeCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('search.chat', {
            url: '/chat/:id/:seller/:buyer',
            views: {
                'menuContent': {
                    templateUrl: 'templates/chat.html',
                    controller: 'ChatCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('search.offer', {
            url: '/offer/:id/:seller/:buyer',
            views: {
                'menuContent': {
                    templateUrl: 'templates/offer.html',
                    controller: 'OfferCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })

    .state('search.inbox', {
            url: '/inbox',  
            views: {
                'menuContent': {
                    templateUrl: 'templates/inbox.html',
                    controller: 'InboxCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
