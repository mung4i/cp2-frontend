'use strict';

var app = angular.module('bucketlist.home', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

app.controller('HomeCtrl', function ($scope, bucketlist_api, $location) {
    $scope.email = null;
    $scope.password = null;
    $scope.postdata = function (title) {
        bucketlist_api.createBucketlist(title).then(function (response) {
            if (response.data) {
                $scope.msg = response.data.message;
                $location.path('/view');
            }
        },
            function (response) {
                $scope.statusval = response.status;
                $scope.statustext = response.message;
            }
            )
    };

});