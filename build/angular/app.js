
var app = angular.module('cryptoPass', ['ui.router', require('angular-animate')])
app.config(function ($urlRouterProvider) {
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');

});
