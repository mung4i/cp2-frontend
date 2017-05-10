'use strict'; 

var app = angular.module('bucketlist.view', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/view', {
        templateUrl: 'view/view.html',
        controller: 'ViewCtrl'
    });
}])

app.controller('ViewCtrl', function($scope, $http, $location, $window){
   var token = $window.localStorage.getItem("Authorization");
   $http.get("http://127.0.0.1:5000/v1/bucketlists/", 
   {
       headers: {'Authorization': token}
   }
   ).then(function(response){
       console.log(response.data)
       $scope.bucketlist = response.data["bucketlists"]
       $scope.next_url = response.data.next_url
       var next_url = response.data.next_url
       console.log(next_url)
       
    });

    $scope.getdata = function(next_url){
        $http.get(String(next_url),
       {
           headers: { 'Authorization': token}
       }
       ).then(function(response){
            $scope.bucketlist = response.data["bucketlists"]
            $scope.next_url = response.data.next_url
            $scope.prev_url = response.data.prev_url
           
   });
   };
});