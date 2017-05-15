'use strict';

var app = angular.module('bucketlist.signin', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/signin', {
        templateUrl: 'signin/signin.html',
        controller: 'SignInCtrl'
    });
}])

app.controller('SignInCtrl', function ($scope, auth_api, $location, $window) {
    $scope.postdata = function (email, password) {
        auth_api.loginUser(email, password).then(function (response) {
            if (response) {
                $scope.msg = response.data.message;
                $window.localStorage.setItem('Authorization', response.data.auth_token)
                $location.path('/home');
            }
        },
            function (response) {
                $scope.statusval = response.status;
                $scope.statustext = response.message;
            }

        )
    };

});