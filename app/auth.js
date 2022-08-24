(function () {
    var baseUrl = "https://cp2-bucketlist.herokuapp.com/v1/auth/"

    var auth_api = function ($http, $window) {
        var createUser = function (first_name, last_name, email, password, confirm_password) {
            var data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                confirm_password: confirm_password
            }
            return $http.post(baseUrl + "register/", JSON.stringify(data)).then(function (response) {
                return response
            });
        };

        var loginUser = function (email, password) {
            var data = {
                email: email,
                password: password
            }
            return $http.post(baseUrl + "login/", JSON.stringify(data)).then(function (response) {
                return response
            });
        };

        return {
            createUser: createUser,
            loginUser: loginUser
        };
    };

    var module = angular.module('bucketlist');
    module.factory("auth_api", auth_api)
}());