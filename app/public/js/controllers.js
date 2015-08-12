'use strict';

angular.module('pingApp.Controllers', [])
.controller('PingController', function PingController($scope, $http, $q, pingService) {

    $scope.loading = true;

    $scope.pingList = [
        { title: 'API',         url: '/api',        statusCode: "", statusColor: "ping-waiting" },
        { title: 'API PROXY',   url: '/proxy',      statusCode: "", statusColor: "ping-waiting" },
        { title: 'CDN',         url: '/cdn',        statusCode: "", statusColor: "ping-waiting" },
        { title: 'Devices 1',   url: '/devices1',   statusCode: "", statusColor: "ping-waiting" },
        { title: 'Devices 2',   url: '/devices2',   statusCode: "", statusColor: "ping-waiting" }
    ];

    var promiseList = [];
    var pingList = $scope.pingList;

    for(var i=0; i < pingList.length; i++) {
        startService(i);
    }

    function startService(indexId) {
        pingService.getPing(pingList[indexId].url, indexId).then( function(data) {
            updatePingStatus(data.id, data.status);
        }, function(error) {
            updatePingStatus(error.id, false);
            
        });
    }

    function updatePingStatus(indexId, status) {
        var item = $scope.pingList[indexId];
        item.statusColor = status ? "ping-success" : "ping-fail";
        item.statusCode = status ? 200 : 500;
    }
});

