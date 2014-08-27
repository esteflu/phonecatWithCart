'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource', 'ngCookies']);

phonecatServices.factory('Phone', ['$resource',
    function ($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
        });
    }]);

phonecatServices.factory('Cart', ['CookieService',
    function (CookieService) {
        var cart = {};
        cart.items = [];
        cart.totalAmount = 0;
        cart.size = 0;
        cart.TITLE = 'Cart';
        cart.cookieManager = CookieService;

        cart.mergeWithCookie = function () {
            var tempCart = this.loadCartFromCookie();
            if (cart.size == 0 && tempCart != undefined) {
                for (var i = 0; i < tempCart.items.length; i++) {
                    this.addItem(tempCart.items[i]);
                }
            }
        };

        cart.addItem = function (item) {
            this.items.push(item);
            this.updateCart(item.price, null);
        };

        cart.removeItem = function (item) {
            this.items.splice(cart.items.indexOf(item), 1);
            this.updateCart(null, item.price);
        };

        cart.updateCart = function (amountToIncrease, amountToDecrease) {
            this._updateAmount(amountToIncrease, amountToDecrease);
            this._updateSize();
            this.persistCart(cart);
        };

        cart._updateAmount = function (amountToIncrease, amountToDecrease) {
            if (amountToDecrease == null)
                cart.totalAmount += amountToIncrease;
            if (amountToIncrease == null)
                cart.totalAmount -= amountToDecrease;
        };

        cart._updateSize = function () {
            cart.size = cart.items.length;
        };

        cart.persistCart = function (currentCart) {
            cart.cookieManager.setCookie(cart.TITLE, currentCart);
        };

        cart.loadCartFromCookie = function () {
            return this.cookieManager.getCookie(this.TITLE);
        };

        return cart;
    }]);

phonecatServices.factory('CookieService', ['$cookieStore',
    function ($cookieStore) {
        return {
            setCookie: function (key, value) {
                $cookieStore.put(key, value);
            },

            getCookie: function (key) {
                return $cookieStore.get(key);
            },

            clearCookie: function (key) {
                $cookieStore.remove(key);
            }
        };
    }]);
