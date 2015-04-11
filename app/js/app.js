'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'phonecatAnimations',
    'phonecatControllers',
    'phonecatFilters',
    'phonecatServices',
    'phonecatDirectives'
]);

phonecatApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/phones', {
                templateUrl: 'partials/phone-list.html',
                controller: 'PhoneListCtrl'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }).
            when('/checkout', {
                templateUrl : 'partials/checkout.html',
                controller : 'PhoneCartCheckoutCtrl'
            }).
            when('/test', {
                templateUrl : 'partials/sandbox.html',
                controller : 'sandboxCtrl'
            }).
            otherwise({
                redirectTo: '/phones'
            });
    }]);

phonecatApp.run(['Cart',
    function(Cart) {
      Cart.mergeWithCookie();
    }]);
