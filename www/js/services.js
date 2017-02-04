angular.module('starter.services', [])
    .factory('httpInterceptor', function(INSTANCE_URL, INSTANCE_PORT) {
        return {
            request: function(config) { // Prepend instance url before every api call

                if (config.url.indexOf('/api/v2') > -1) { config.url = INSTANCE_URL + ':' + INSTANCE_PORT + config.url; };
                return config;
            }
        }
    })
    .factory("FireBase", function($firebaseAuth) {
        return {
            Authen: function() {
                var usersRef = new Firebase("https//luminous-inferno-6016.firebaseio.com/users");
                return $firebaseAuth(usersRef);
            },
            UnAuthen: function() {
                var usersRef = new Firebase("https//luminous-inferno-6016.firebaseio.com/users");
                var onAuthCallback = function(authData) {
                    if (authData) {
                        console.log("Off Authenticated with uid:", authData.uid);
                    } else {
                        console.log("Client unauthenticated.")
                    }
                };
                usersRef.offAuth(onAuthCallback);
            }
        }
    })

.factory('Login', function() {
        var login = null;
        return {
            SetLogin: function(data) {
                this.login = data;
                console.log(this.login);
            },
            GetLogin: function() {
                return this.login;
            }
        }
    })
    .factory('DB', function($http) {
        return {
            gettable: function(db, tb) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('/api/v2/' + db + '/_table/' + tb).then(function(res) {
                    // The then function here is an opportunity to modify the response
                    //console.log(JSON.stringify(res));โ€
                    // The return value gets picked up by the then in the controller.
                    return res.data;
                }, function(res) {
                    return res.data;
                });
                // Return the promise to the controller
                return promise;
            },
            insert_table: function(db, tb, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.post('/api/v2/' + db + '/_table/' + tb, {
                    "resource": data
                }).then(function(res) {
                    // The then function here is an opportunity to modify the response
                    //console.log(JSON.stringify(res));โ€
                    // The return value gets picked up by the then in the controller.
                    return res;
                }, function(res) {

                    return res;
                });
                // Return the promise to the controller
                return promise;
            },
            sp_param: function(db, sp, data) {
                //Example data
                /*
                    [{
                        "name": "PAR_DB_TABLE",
                        "param_type": "IN",
                        "value": "tb_meter meter left join tb_getdataesump esump on (meter.metername = esump.metername)"
                    }, {
                        "name": "PAR_DB_FIELD",
                        "param_type": "IN",
                        "value": "*"
                    }, {
                        "name": "PAR_DB_FILTER",
                        "param_type": "IN",
                        "value": ""
                    }]
                */
                var promise = $http.post('/api/v2/' + db + '/_proc/' + sp, {
                    "params": data,
                    "schema": {},
                    "wrapper": "resource"
                }).then(function(res) {
                    return res.data;
                }, function(res) {
                    return res.data;

                });
                return promise;
            }
        }

    })
    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();

        fd.append('files', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })

        .success(function() {})

        .error(function() {});
    }

}])
 .directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;


            element.bind('change', function() {



                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
    .factory('MockService', ['$http', '$q',
        function($http, $q) {
            var me = {};

            me.getUserMessages = function(d) {
                /*
                var endpoint =
                  'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
                return $http.jsonp(endpoint).then(function(response) {
                  return response.data;
                }, function(err) {
                  console.log('get user messages error, err: ' + JSON.stringify(
                    err, null, 2));
                });
                */
                var deferred = $q.defer();

                setTimeout(function() {
                    deferred.resolve(getMockMessages());
                }, 1500);

                return deferred.promise;
            };

            me.getMockMessage = function() {
                return {
                    userId: '534b8e5aaa5e7afc1b23e69b',
                    date: new Date(),
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                };
            }

            return me;
        }
    ])

// fitlers
.filter('nl2br', ['$filter',
    function($filter) {
        return function(data) {
            if (!data) return data;
            return data.replace(/\n\r?/g, '<br />');
        };
    }
])

// directives
.directive('autolinker', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $timeout(function() {
                        var eleHtml = element.html();

                        if (eleHtml === '') {
                            return false;
                        }

                        var text = Autolinker.link(eleHtml, {
                            className: 'autolinker',
                            newWindow: false
                        });

                        element.html(text);

                        var autolinks = element[0].getElementsByClassName('autolinker');

                        for (var i = 0; i < autolinks.length; i++) {
                            angular.element(autolinks[i]).bind('click', function(e) {
                                var href = e.target.href;
                                console.log('autolinkClick, href: ' + href);

                                if (href) {
                                    //window.open(href, '_system');
                                    window.open(href, '_blank');
                                }

                                e.preventDefault();
                                return false;
                            });
                        }
                    }, 0);
                }
            }
        }
    ])
    .directive('focusMe', function($timeout) {
        return {
            scope: { trigger: '=focusMe' },
            link: function(scope, element) {
                scope.$watch('trigger', function(value) {
                    if (value === true) {
                        //console.log('trigger',value);
                        //$timeout(function() {
                        element[0].focus();
                        var val = element[0].value; //store the value of the element
                        element[0].value = ''; //clear the value of the element
                        element[0].value = val; //set that value back.  
                        scope.trigger = false;
                        //});
                    }
                });
            }
        };
    });

function onProfilePicError(ele) {
    this.ele.src = ''; // set a fallback
}

function getMockMessages() {
    return { "messages": [{ "_id": "535d625f898df4e80e2a125e", "text": "Ionic has changed the game for hybrid app development.", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-04-27T20:02:39.082Z", "read": true, "readDate": "2014-12-01T06:27:37.944Z" }, { "_id": "535f13ffee3b2a68112b9fc0", "text": "I like Ionic better than ice cream!", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-04-29T02:52:47.706Z", "read": true, "readDate": "2014-12-01T06:27:37.944Z" }, { "_id": "546a5843fd4c5d581efa263a", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-17T20:19:15.289Z", "read": true, "readDate": "2014-12-01T06:27:38.328Z" }, { "_id": "54764399ab43d1d4113abfd1", "text": "Am I dreaming?", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-26T21:18:17.591Z", "read": true, "readDate": "2014-12-01T06:27:38.337Z" }, { "_id": "547643aeab43d1d4113abfd2", "text": "Is this magic?", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-26T21:18:38.549Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z" }, { "_id": "547815dbab43d1d4113abfef", "text": "Gee wiz, this is something special.", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-28T06:27:40.001Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z" }, { "_id": "54781c69ab43d1d4113abff0", "text": "I think I like Ionic more than I like ice cream!", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-28T06:55:37.350Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z" }, { "_id": "54781ca4ab43d1d4113abff1", "text": "Yea, it's pretty sweet", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-28T06:56:36.472Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z" }, { "_id": "5478df86ab43d1d4113abff4", "text": "Wow, this is really something huh?", "userId": "534b8fb2aa5e7afc1b23e69c", "date": "2014-11-28T20:48:06.572Z", "read": true, "readDate": "2014-12-01T06:27:38.339Z" }, { "_id": "54781ca4ab43d1d4113abff1", "text": "Create amazing apps - ionicframework.com", "userId": "534b8e5aaa5e7afc1b23e69b", "date": "2014-11-29T06:56:36.472Z", "read": true, "readDate": "2014-12-01T06:27:38.338Z" }], "unread": 0 };
}

// configure moment relative time
/*moment.locale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "%d sec",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }
});
*/