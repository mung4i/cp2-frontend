'use strict';

var app = angular.module('bucketlist.items', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/items/:id', {
        templateUrl: 'items/items.html',
        controller: 'ItemCtrl'
    });

}])

app.controller('ItemCtrl', function ($scope, bucketlist_api, $http, $window, $location, $routeParams, $route) {
    var id = $routeParams.id

    bucketlist_api.getBucketlistItems(id).then(function (response) {
        $scope.bucketlist = response.data
    }, function (response) {
        var status = response.status
        if (status != 200) {
            $scope.errorMsg = response.data.message
            console.log($scope.errorMsg)
        }
    });

    $scope.postitem = function (name) {
        bucketlist_api.createBucketlistItems(name, id)
            .then(function (response) {
                $scope.successMsg = response.data.message
                $route.reload();
            });
    }

    $scope.editdata = function (name, item_id) {
        bucketlist_api.editBucketlistItems(name, item_id, id)
            .then(function (response) {
                $route.reload();
                $scope.successMsg = response.data.message
            });
    }

    $scope.deletedata = function (item_id) {
        bucketlist_api.deleteBucketlistItems(item_id, id)
            .then(function (response) {
                $scope.errorMsg = "Bucketlist deleted successfully"
                $route.reload();
            })
    }
})