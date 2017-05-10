'use strict';

var app = angular.module('bucketlist.signin', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'SignInCtrl'
  });
}])

app.controller('SignInCtrl', function($scope, $http, $location, $window){
  $scope.email=null;
  $scope.password=null;
  $scope.postdata = function(email, password){
    var data = {
      email: email,
      password: password
    };

  $http.post("http://127.0.0.1:5000/v1/auth/login", JSON.stringify(data)).then(function(response){
    if (response){
    $scope.msg = response.data.message;
    $window.localStorage.setItem('Authorization', response.data.auth_token)
    $location.path('/home');
    }
  },
  function(response){
    $scope.statusval=response.status;
    $scope.statustext = response.message;
  }

  )};

});