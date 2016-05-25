var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller listening");

    var refresh = function() {
        $http.get('/nutrition:id').success(function(response) {
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
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = hr + ':' + min + ' ' + dd + '/' + mm + '/' + yyyy;

    $scope.addComment = function() {
        $scope.comment.datetime = today;
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