'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'Cart',
    function ($scope, Phone, Cart) {
        $scope.phones = Phone.query();
        $scope.orderProp = 'age';
        $scope.addToCart = function (phone) {
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

phonecatControllers.controller('PhoneCartCtrl', ['$scope', 'Cart',
    function ($scope, Cart) {
        $scope.cartText = {
            itemSingular: "item",
            itemPlural: "items",
            checkout: "Checkout"
        };
        $scope.cart = Cart;
    }]);

phonecatControllers.controller('PhoneCartCheckoutCtrl', ['$scope', 'CookieService',
    function ($scope, CookieService) {
        $scope.orderText = {
            confirmation: "Order confirmation",
            totalAmount: "Total amount"
        }
        $scope.order = CookieService.getCookie('Cart');
    }]);
phonecatControllers.controller('sandboxCtrl', ['$scope', '$log',
    function ($scope, $log) {
        $scope.isSelected = function() {
            $log.info($scope.checkboxModel);
        }
        $scope.checkboxModel = {
            value : 'unchecked'
        };

    }]);
