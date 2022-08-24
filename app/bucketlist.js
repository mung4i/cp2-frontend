(function () {
    var baseUrl = "https://cp2-bucketlist.herokuapp.com/v1/bucketlists/";

    var bucketlist_api = function ($http, $window) {
        var createBucketlist = function (title) {
            var data = {
                title: title
            }
            return $http.post(baseUrl, JSON.stringify(data),
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };
        var getBucketlists = function () {
            return $http.get(baseUrl,
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };

        var getNextBucketlist = function (nextUrl) {
            return $http.get(String(nextUrl),
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };

        var searchBucketlists = function (searchParams) {
            return $http.get(baseUrl + "?q=" + String(searchParams),
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };

        var deleteBucketlist = function (params) {
            return $http.delete(baseUrl + params,
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });

        };

        var editBucketlist = function (title, id) {
            var data = {
                title: title
            }
            return $http.put(baseUrl + id, JSON.stringify(data),
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };

        var getBucketlistItems = function (id) {
            return $http.get(baseUrl + id + "/items/",
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });

        };

        var createBucketlistItems = function (name, id) {
            var data = {
                name: name
            }
            return $http.post(baseUrl + id + "/items/", JSON.stringify(data),
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };

        var editBucketlistItems = function (name, item_id, id) {
            var data = {
                name: name
            }
            return $http.put(baseUrl + id + "/items/" + item_id + '/', JSON.stringify(data),
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });

        };

        var deleteBucketlistItems = function (item_id, id) {
            return $http.delete(baseUrl + id + "/items/" + item_id + '/',
                {
                    headers: { 'Authorization': $window.localStorage.getItem("Authorization") }
                })
                .then(function (response) {
                    return response
                });
        };




        return {
            createBucketlist: createBucketlist,
            getBucketlists: getBucketlists,
            getNextBucketlist: getNextBucketlist,
            searchBucketlists: searchBucketlists,
            deleteBucketlist: deleteBucketlist,
            editBucketlist: editBucketlist,
            getBucketlistItems: getBucketlistItems,
            createBucketlistItems: createBucketlistItems,
            editBucketlistItems: editBucketlistItems,
            deleteBucketlistItems: deleteBucketlistItems
        };
    };
    var module = angular.module('bucketlist');
    module.factory("bucketlist_api", bucketlist_api);

}());