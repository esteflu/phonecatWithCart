'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
    function ($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
        });
    }]);

phonecatServices.factory('Cart', [
    function() {
        var cart = {};
        cart.items = [];
        cart.totalAmount = 0;
        cart.size = 0;

        cart.addItem = function(item) {
            this.items.push(item);
            this.updateCart(item.price, null);
        };
        cart.removeItem = function(item) {
            this.items.splice(cart.items.indexOf(item), 1);
            this.updateCart(null, item.price);
        };
        cart.updateCart = function(amountToIncrease, amountToDecrease) {
           this._updateAmount(amountToIncrease, amountToDecrease);
           this._updateSize();
        };
        cart._updateAmount = function(amountToIncrease, amountToDecrease) {
            if (amountToDecrease == null)
                cart.totalAmount += amountToIncrease;
            if (amountToIncrease == null)
                cart.totalAmount -= amountToDecrease;
        };
        cart._updateSize = function() {
            cart.size = cart.items.length;
        };

        return cart;
    }]);
