angular.module('starter.controllers_ChatCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])

.controller('ChatCtrl', function($window, $scope, $filter, $rootScope, $state, $stateParams, $ionicActionSheet,
    $ionicPopup, $ionicScrollDelegate, $timeout, $interval, ionicMaterialInk, MockService, DB, $firebaseArray,$timeout) {
    ionicMaterialInk.displayEffect();
    $stateParams.id
    $stateParams.seller
    $stateParams.buyer
    $scope.Params_seller = $stateParams.seller
    $scope.Params_buyer = $stateParams.buyer
    $scope.Params_product = $stateParams.id
    $scope.login = JSON.parse(localStorage.getItem("login"));
       $scope.login_id = JSON.parse(localStorage.getItem("user_login"));
    $scope.pro_like = '';
    $scope.pro_sell = '';
    $scope.pro_buy = '';
    $scope.pro_insert = '';
    $scope.pro_update = '';
    $scope.pro_accepted = '';
    $scope.pro_decline = '';

 
 
console.log(JSON.stringify( 'รหัสสินค้า' +':'+ $scope.Params_product ))
console.log(JSON.stringify( 'รหัสคนขาย' +':'+ $stateParams.seller))
console.log(JSON.stringify( 'รหัสคนซื้อ' +':'+ $stateParams.buyer))
    //console.log($scope.Params_product)


$scope.show_join_user_porduct = function() {


        //  $scope.loading();
        DB.sp_param($scope.DB1, 'user_join_product').then(function(res) {

            if (res.resource !== undefined) {
                $scope.pro_data = res.resource;
                //  $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                $scope.login_Params = $filter('filter')($scope.pro_data, { face_id: $scope.login.id })[0];


            }
          //  console.log(JSON.stringify($scope.login_Params.userid));
        });
    }
    $scope.show_join_user_porduct();

$scope.get_firebase = function(){

    /*        $scope.hovering = false;
            var timer;
                timer = $timeout(function() {*/


   var ref = new Firebase("https://chatbrandname24.firebaseio.com/");
     $scope.message = $firebaseArray(ref);
      /*    $scope.hovering = true;
                }, 1000);*/
     var ref = new Firebase("https://luminous-inferno-6016.firebaseio.com/");
            // create a synchronized array
            // click on `index.html` above to see it used in the DOM!
            $scope.list_data = $firebaseArray(ref);


}
$scope.get_firebase();
//console.log(JSON.stringify(ref))
  
    /* var ref1 = new Firebase("https://luminous-inferno-6016.firebaseio.com/");

            $scope.list_msg = $firebaseArray(ref1);*/
 $scope.show_chat = function() {

        //  $scope.loading();
        DB.gettable($scope.DB1, 'sys_ms_user').then(function(res) {

            if (res.resource !== undefined) {
                $scope.data_chat = res.resource;
                $scope.login_chat = $filter('filter')($scope.data_chat, { face_id: $scope.login.id })[0];
  
                //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                console.log(JSON.stringify($scope.userid));

            }
          
        });


    }
    $scope.show_chat();

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

  

    $scope.Add_chat_data = function(e) {
/*            var ref = new Firebase("https://chatbrandname24.firebaseio.com/");

            $scope.message = $firebaseArray(ref);*/



          if ($scope.Params_seller == $scope.login_chat.userid) {
            $scope.chat_type = 1;
            console.log($scope.Params_seller);
        } else {

            $scope.chat_type = 2;
        }


        // alert($scope.chat_type);
        $scope.message.$add({
            pro_id: $scope.Params_product,
            chat_by: $scope.login_chat.userid,
            chat_detail: $scope.chat_detail ,
            pro_offer: 4000,
            chat_type: $scope.chat_type,
            chat_photo: $scope.login_chat.photo,
             date : (new Date()).getTime(),
            
        });
          //  console.log(JSON.stringify($scope.message.chat_detail) );
        $scope.Log_Data()
        $scope.chat_detail = '';
        //console.log(JSON.stringify($scope.message))
        };
/*
$scope.show_D = function(){



 $scope.message.$loaded().then(function() {



 $scope.list_message = $filter('filter')($scope.message,{chat_by: $scope.Params_selle,chat_by: $scope.Params_buyer,pro_id : $scope.Params_product}); 

 console.log(JSON.stringify($scope.list_message))
 })
}
$scope.show_D();*/
   

 /*   $scope.show_chat_data = function() {


        //  $scope.loading();
        DB.sp_param($scope.DB1, 'user_join_chat').then(function(res) {

            if (res.resource !== undefined) {
                $scope.chat_data = res.resource;
               $scope.login_Params = $filter('filter')($scope.data_chat, { face_id: $scope.login.id });

                //console.log(JSON.stringify(  $scope.login[0].face_id  ));
                //console.log(angular.toJson($scope.country));

            }
            //- console.log(JSON.stringify($scope.chat_data));
        });
    }
    $scope.show_chat_data();*/

    


$scope.myFilter = function (msg) { 
   return (msg.chat_by == $scope.Params_seller &&  msg.pro_id == $scope.Params_product) || ( msg.chat_by == $scope.Params_buyer  &&  msg.pro_id == $scope.Params_product )  ; 
  

};

    $scope.Log_Data = function() {
$scope.show_join_user_porduct();
 
        $scope.login = JSON.parse(localStorage.getItem("login"));
        //    console.log( $scope.login);


    //    console.log($scope.Params_seller + ',' + $scope.Params_product + ',' + $scope.Params_buyer);

        if ($scope.Params_seller == $scope.login_chat.userid) {
            $scope.chat_type = 1;
            console.log($scope.Params_seller);
        }else if (($scope.Params_seller != $scope.login_chat.userid)) {

            $scope.chat_type = 2;
        }
      
        $scope.list_data.$add({
            log_by: $scope.login_chat.userid,
            log_to: ($scope.chat_type!= 1 ? $scope.Params_seller : $scope.Params_buyer),
            pro_id: $scope.Params_product,
            pro_offer: 4000,
            chat_detail: $scope.chat_detail, 
            pro_like: $scope.pro_like,
            pro_insert: $scope.pro_insert,
            pro_update: $scope.pro_update,
            pro_accepted: $scope.pro_accepted,
            pro_decline: $scope.pro_decline,
            chat_type: $scope.chat_type,
            chat_photo: $scope.login_chat.photo,
            date : (new Date()).getTime(),
        });
        $scope.chat_detail = '';
    }

$scope.Update_chat_status = function(id) {
            var data1 = [{
                    "name": "in_pro_id",
                    "param_type": "IN",
                    "value": $scope.Params_product
                }, {
                    "name": "in_pro_status",
                    "param_type":"IN",
                    "value": id
                },

            ];


            DB.sp_param($scope.DB1, 'update_status_offer', data1).then(function(res) {
                //console.log(JSON.stringify(res));

                if (res.resource !== undefined) {
                    $scope.update_status = res.resource;

                }
                //$scope.hide();        
                   //     alert(JSON.stringify(id));
            })


        };

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


          };*/

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
      //  console.log('input.message $watch, newValue ' + newValue);
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
});
