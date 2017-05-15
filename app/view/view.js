'use strict';

var app = angular.module('bucketlist.view', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view', {
        templateUrl: 'view/view.html',
        controller: 'ViewCtrl'
    });
}])



app.controller('ViewCtrl', function ($scope, bucketlist_api, $http, $location, $window, $route) {
    var token = $window.localStorage.getItem("Authorization");

    bucketlist_api.getBucketlists().then(function (response) {
        $scope.bucketlist = response.data["bucketlists"]
        $scope.next_url = response.data.next_url
        $scope.prev_url = response.data.prev_url
    }, function (response) {
        var status = response.status
        if (status == 401) {
            $location.path('/signin');
        }
        else {
            $location.path('/home');
        }

    });

    $scope.getdata = function (url) {
        bucketlist_api.getNextBucketlist(url).then(function (response) {
            $scope.bucketlist = response.data["bucketlists"]
            $scope.next_url = response.data.next_url
            $scope.prev_url = response.data.prev_url

        },
            function (response) {
                var status = response.status
                if (status != 200) {
                    $scope.msg = "No more bucketlists"
                }
            });
    }

    $scope.searchdata = function (searchparams) {
        bucketlist_api.searchBucketlists(searchparams).then(function (response) {
            $scope.bucketlist = response.data["bucketlists"]
            $scope.next_url = response.data.next_url
            $scope.prev_url = response.data.prev_url
            $scope.msg = response.data.message
            $route.reload();
        },
            function (response) {
                if (status != 200) {
                    $scope.msg = "Bucketlist does not exist."
                }
            }
        );
    }

    $scope.deletedata = function (params) {
        bucketlist_api.deleteBucketlist(params).then(function (response) {
            $route.reload();
            $scope.msg = "Deleted successfully"
            
        });
    }

    $scope.editdata = function (title, id) {
        bucketlist_api.editBucketlist(title, id).then(function (response) {
            $scope.msg = response.data.message

        });
    }
});