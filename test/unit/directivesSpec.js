'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {

    beforeEach(module('phonecatApp'));
    beforeEach(module('templates'));

    var scope, element, ctrl,
        mockItems = [{"name": "LG Axis"}, {"name": "Dell Streak 7"}];

    function addItemsToCart() {
        for (var i = 0; i < mockItems.length; i++) {
            scope.cart.addItem(mockItems[i]);
        }
    };

    beforeEach(inject(function ($rootScope, $compile, $controller) {
        element = angular.element("<drop-down-menu></drop-down-menu>");
        scope = $rootScope;
        ctrl = $controller('PhoneCartCtrl', { $scope: scope });

        addItemsToCart();
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should contain the names of the items in the cart', function () {
        for (var i = 0; i < scope.cart.items.length; i++) {
            expect(element.html()).toContain(scope.cart.items[i].name);
        }
    });

    it('the table rows should equal the nr of items in the cart', function () {
        expect(element.find('tr').length).toEqual(scope.cart.items.length);
        scope.cart.removeItem(mockItems[0]);
        scope.$digest();
        expect(element.find('tr').length).toEqual(scope.cart.items.length);
    });

    it('the checkout button should have a string label', function () {
        var checkoutButton = element.find('button').contents()[0];
        expect(checkoutButton.text).toEqual(scope.cartText.checkout);
    });
});
