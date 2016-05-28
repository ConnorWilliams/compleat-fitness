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

    var uploadImg = function() {
        $http.post('/gallery').success(function(response) {
            if(response.success){
                console.log(response);
                console.log("Image successfully uploaded");
                // refresh();
            } else {
                console.log("Image upload failed!");
            }
            // $scope.response = response.resp;
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

function instafeeder() {
    var feed = new Instafeed({
        clientId: 'e0347429fc5548d48ddb0b92cbfbfcbb',
        accessToken: '233584328.e034742.88db8c1704d14b11856e3382dba76ad9',
        get: 'user',
        userId: '233584328',
        template: '<img src="{{model.images.standard_resolution.url}}"/>',
        after: function() {
            runSlick();
        },
    });
    feed.run();
}

function runSlick() {
    $('.instafeed').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        arrows: false,
    });
}
