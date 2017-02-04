angular.module('starter.controllers_ForumCtrl', ['monospaced.elastic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ngMaterial', 'ngMessages'])
  
  .controller('ForumCtrl', function($scope, ionicMaterialInk, ionicMaterialMotion, $stateParams, DB) {
        ionicMaterialInk.displayEffect();
    })