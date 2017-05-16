'use strict';

var app = angular.module('bucketlist.home', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

app.controller('HomeCtrl', function ($scope, bucketlist_api, $location) {
    $scope.postdata = function (title) {
        bucketlist_api.createBucketlist(title).then(function (response) {
            var status = response.status
            if (status == 401) {
                $scope.msg = response.data.message
                $location.path('/signin');
            }
            else {
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