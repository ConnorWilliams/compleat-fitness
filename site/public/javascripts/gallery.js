var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller listening");

    var refresh = function() {
        $http.get('/fetchsource').success(function(response) {
            console.log("I got the data I requested");
            $scope.imgrefs = response;
            $scope.imgref = "";
        });
    };

    var uploadImg = function() {
        $http.post('/gallery').success(function(response) {
            console.log("Image successfully uploaded");
            refresh();
        });
    };

    refresh();

}]);﻿


myApp.filter('reverse', function() {
    return function(items) {
        if (!items || !items.length) {
            return;
        }
        return items.slice().reverse();
    };
});