angular.module('starter.controllers_SettingCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('SettingCtrl', function($scope, $state, ionicMaterialInk, ionicMaterialMotion, $ionicModal, $ionicHistory, FireBase) {

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
    })