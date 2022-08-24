'use strict';

var app = angular.module('bucketlist.signup', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignUpCtrl'
    });
}])

app.controller('SignUpCtrl', function ($scope, auth_api, $location) {
    $scope.first_name = null;
    $scope.last_name = null;
    $scope.email = null;
    $scope.password = null;
    $scope.confirm_password = null;
    $scope.postdata = function (first_name, last_name, email, password, confirm_password) {
        auth_api.createUser(first_name, last_name, email, password, confirm_password).then(function (response) {
            if (response.data) {
                $scope.msg = response.message;
                auth_api.loginUser($scope.email, $scope.password).then(function (response) {
                    if (response.data) {
                        $scope.msg = response.message;
                        $location.path('/home');
                    }

                });

            }
        },
            function (response) {
                $scope.statusval = response.status;
                $scope.statustext = response.message;

            });
    };



});