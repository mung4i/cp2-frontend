(function () {
    var baseUrl = "http://127.0.0.1:5000/v1/bucketlists/";

    var bucketlist_api = function ($http, $window) {
        var token = $window.localStorage.getItem("Authorization");
        var getBucketlists = function () {
            return $http.get(baseUrl,
                {
                    headers: { 'Authorization': token }
                })
                .then(function (response) {
                    return response
                });
        };

        var getNextBucketlist = function (nextUrl) {
            return $http.get(String(nextUrl),
                {
                    headers: { 'Authorization': token }
                })
                .then(function (response) {
                    return response
                });
        };

        var searchBucketlists = function (searchParams) {
            return $http.get(baseUrl + "?q=" + String(searchParams),
                {
                    headers: { 'Authorization': token }
                })
                .then(function (response) {
                    return response
                });
        };

        var deleteBucketlist = function (params) {
            return $http.delete(baseUrl + params,
                {
                    headers: { 'Authorization': token }
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
                    headers: { 'Authorization': token }
                })
                .then(function (response) {
                    return response
                });
        };

        var getBucketlistItems = function (id) {
            return $http.get(baseUrl + id + "/items/",
                {
                    headers: { 'Authorization': token }
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
                    headers: { 'Authorization': token }
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
                headers: { 'Authorization': token }
            })
            .then(function (response){
                return response
            });

        };

        var deleteBucketlistItems = function (item_id, id){
            return $http.delete(baseUrl + id + "/items/" + item_id + '/',
            {
                headers: { 'Authorization': token }
            })
            .then(function(response){
                return response
            });
        };




        return {

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