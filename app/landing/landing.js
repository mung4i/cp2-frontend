'use strict';

var app = angular.module('bucketlist.landing', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'landing/landing.html',
        controller: 'LandingCtrl'
    });
}])

app.controller('LandingCtrl', [function () {

}]);