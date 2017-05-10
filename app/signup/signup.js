'use strict';

var app = angular.module('bucketlist.signup', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignUpCtrl'
  });
}])

app.controller('SignUpCtrl', function($scope, $http, $location) {
    $scope.first_name=null;
    $scope.last_name=null;
    $scope.email=null;
    $scope.password=null;
    $scope.confirm_password=null;
    $scope.postdata = function(first_name, last_name, email, password, confirm_password){
        var data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            confirm_password: confirm_password
        };
    $http.post("http://127.0.0.1:5000/v1/auth/register", JSON.stringify(data)).then(function(response){
        if (response.data){
            $scope.msg=response.message;
            var data = {
                email: $scope.email,
                password: $scope.password
                
            };
            $http.post("http://127.0.0.1:5000/v1/auth/login", JSON.stringify(data)).then(function(response){
            if (response.data){
                $scope.msg = response.message;
                $location.path('/landing');
            }
            
        });
            
        }
    },
    function(response){
        $scope.statusval = response.status;
        $scope.statustext = response.message;
     
    });
    };
    
   
        
});