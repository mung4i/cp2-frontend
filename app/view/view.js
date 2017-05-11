'use strict';

var app = angular.module('bucketlist.view', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view', {
        templateUrl: 'view/view.html',
        controller: 'ViewCtrl'
    });
}])



app.controller('ViewCtrl', function ($scope, $http, $location, $window) {
    var token = $window.localStorage.getItem("Authorization");

    $http.get("http://127.0.0.1:5000/v1/bucketlists/",
        {
            headers: { 'Authorization': token }
        }).then(function (response) {
            $scope.bucketlist = response.data["bucketlists"]
            $scope.next_url = response.data.next_url
            $scope.prev_url = response.data.prev_url
        }, function (response) {
            var status = response.status
            if (status != 200) {
                $location.path('/home');
            }
        });

    $scope.getdata = function (next_url) {
        $http.get(String(next_url),
            {
                headers: { 'Authorization': token }
            }).then(function (response) {
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
    };

    $scope.searchdata = function (searchparams) {
        $http.get("http://127.0.0.1:5000/v1/bucketlists/?q=" + String(searchparams),
            {
                headers: { 'Authorization': token }
            }).then(function (response) {
                $scope.bucketlist = response.data["bucketlists"]
                $scope.next_url = response.data.next_url
                $scope.prev_url = response.data.prev_url
                $scope.msg = response.data.message
                $location.path('/view');
            },
            function (response) {
                if (status != 200) {
                    $scope.msg = "Bucketlist does not exist."
                }
            }
            );
    }

    $scope.deletedata = function (params) {
        $http.delete("http://127.0.0.1:5000/v1/bucketlists/" + params,
            {
                headers: { 'Authorization': token }
            }).then(function (response) {
                $scope.msg = "Deleted successfully"
                $location.path('/view');
            });
    }

    $scope.editdata = function (title, id) {
        var data = {
            title: title
        };
        $http.put("http://127.0.0.1:5000/v1/bucketlists/" + id, JSON.stringify(data),
            {
                headers: { 'Authorization': token }

            }).then(function (response) {
                $scope.msg = response.data.message

            })
    }

    $scope.postitem = function (name, id) {
        var data = {
            name: name
        };
        $http.post("http://127.0.0.1:5000/v1/bucketlists/" + id + "/items/", JSON.stringify(data),
            {
                headers: { 'Authorization': token }
            }).then(function (response) {
                $scope.msg = response.data.message
            })
    }
});