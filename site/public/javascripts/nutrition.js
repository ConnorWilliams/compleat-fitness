"use strict";

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller listening");

    var refresh = function() {
        $http.get('/postcomment').success(function(response) {
            console.log("I got the data I requested");
            $scope.commentlist = response;
            $scope.comment = "";
        });
    };

    refresh();

    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (hr < 10) { hr = '0' + hr; }
    if (min < 10) { min = '0' + min; }
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    var today = hr + ':' + min + ' ' + dd + '/' + mm + '/' + yyyy;

    $scope.addComment = function() {
        if ($scope.comment.username === undefined || $scope.comment.usercomment === undefined || $scope.comment.username.length == 0 || $scope.comment.usercomment.length == 0) {
            $("p.alert").text("Please fill both fields!");
            return;
        }
        if ($scope.comment.username.length > 10) {
            $("p.alert").text("Please choose a username fewer than 10 characters!");
            return;
        }
        $scope.comment.datetime = today;
        $("p.alert").text("");
        console.log($scope.comment);
        $http.post('/nutrition', $scope.comment).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.comment = "";
    }

}]);﻿

myApp.filter('reverse', function() {
    return function(items) {
        if (!items || !items.length) {
            return;
        }
        return items.slice().reverse();
    };
});
