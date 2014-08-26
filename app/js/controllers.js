'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['ngCookies']);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone','Cart',
    function ($scope, Phone, Cart) {
        $scope.phones = Phone.query();
        $scope.orderProp = 'age';
        $scope.addToCart = function(phone) {
            Cart.addItem(phone);
        };
    }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
    function ($scope, $routeParams, Phone) {
        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
            $scope.mainImageUrl = phone.images[0];
        });
        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }]);

phonecatControllers.controller('PhoneCartCtrl', ['$scope','Cart',
    function ($scope, Cart) {
        $scope.cartText = {
          itemSingular : "item",
          itemPlural : "items",
          checkout : "Checkout"
        };
        $scope.cart = Cart;
    }]);

phonecatControllers.controller('PhoneCartCheckoutCtrl', ['$scope', 'CookieService',
    function($scope, CookieService) {
       $scope.storage = CookieService.getCookie('Cart');
    }]);