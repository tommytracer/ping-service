'use strict';

angular.module('pingApp.Services', [])
.factory('pingService', function($http, $q) {

    var getPing  = function(url, id) {

        var deferred = $q.defer();

        $http.get(url)
            .success(function(results, status, headers, config){

                if (status === 200) {
                    deferred.resolve({"status": true, id: id});
                } else {
                    deferred.reject({"status": false, id: id});
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
                deferred.reject({"status": false, id: id});
            });
        return deferred.promise;
    };

    return {
        getPing: getPing
    };
});
