'use strict';

var app = angular.module('bucketlist.items', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/items/:id', {
        templateUrl: 'items/items.html',
        controller: 'ItemCtrl'
    });

}])

app.controller('ItemCtrl', function ($scope, $http, $window, $location, $routeParams) {
    var token = $window.localStorage.getItem("Authorization")
    var id = $routeParams.id

    $http({
        method: 'GET',
        url: "http://127.0.0.1:5000/v1/bucketlists/" + id + "/items/",
        headers: { 'Authorization': token }
    }).then(function (response) {
        $scope.bucketlist = response.data
    }, function (response) {
        console.log(response)
        var status = response.status
        if (status != 200) {
            $scope.msg = response.data.message
        }
    });

    $scope.editdata = function (name, item_id) {
        var data = {
            name: name
        };
        $http.put("http://127.0.0.1:5000/v1/bucketlists/" + id + "/items/" + item_id + '/', JSON.stringify(data),
            {
                headers: { 'Authorization': token }
            }).then(function (response) {
                $scope.msg = response.data.message
                $location.path('/items/' + id);
            })
    }
    $scope.deletedata = function (item_id) {
        console.log("You are deleting")
        $http({
            method: 'DELETE',
            url: "http://127.0.0.1:5000/v1/bucketlists/" + id + "/items/" + item_id + '/',
            headers: { 'Authorization': token }
        }).then(function (response) {
            $scope.msg = "Bucketlist deleted successfully"
            $location.path('/items/' + id);
        })
    }
})