'use strict';

var app = angular.module('bucketlist.home', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

app.controller('HomeCtrl', function($scope, $http, $location, $window){
  $scope.email=null;
  $scope.password=null;
  $scope.postdata = function(title){
    var data = {
      title: title
    };
    var token = $window.localStorage.getItem("Authorization");
    console.log(token);


  $http.post("http://127.0.0.1:5000/v1/bucketlists/", JSON.stringify(data),
    {
        headers: {'Authorization': token}
    }
   ).then(function(response){
    if (response.data){
    $scope.msg = response.data.message;
    $location.path('/home');
    }
  },
  function(response){
    $scope.statusval=response.status;
    $scope.statustext = response.message;
    
  }

  )};

});