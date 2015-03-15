'use strict';

var buckutt = angular.module('buckutt', [
    'ngRoute',
    'ngResource',
    'angular-jwt'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'connection/connection.html'
        }).when('/waiter', {
            templateUrl: 'waiter/waiter.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);