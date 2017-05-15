// Controllers, directives and modules

'use strict';

var app = angular.module('bucketlist', [
  'ngRoute',
  'bucketlist.landing',
  'bucketlist.signin',
  'bucketlist.signup',
  'bucketlist.home',
  'bucketlist.view',
  'bucketlist.items'
]).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .otherwise({ redirectTo: '/view' });
  }]);

app.controller('LogoutCtrl', function($scope, $location, $window){
  $scope.logout = function(){
    $window.localStorage.removeItem('Authorization');
    $location.path('/signin');
  };
})

