var myApp = angular.module('myApp', ['angular.filter']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller listening");

    var refresh = function() {
        $http.get('/fetchsource').success(function(response) {
            console.log("I got the data I requested");
            $scope.imgrefs = response;
            $scope.imgref = "";
        });
    };

    refresh();

    $scope.uploadImg = function() {
        $http.post('/gallery').success(function(response) {
            console.log(response);
            refresh();
            // console.log("gallery.js Image successfully uploaded");
            // console.log("gallery.js Image upload failed!");
            // if(response.success){
            // } else {
            // }
            // refresh();
            // $scope.upload_resp = response.resp;
        });
    };

}]);﻿


myApp.filter('reverse', function() {
    return function(items) {
        if (!items || !items.length) {
            return;
        }
        return items.slice().reverse();
    };
});