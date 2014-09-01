'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {

    beforeEach(module('phonecatApp'));
    beforeEach(module('templates'));

    var scope, element, ctrl,
        items = [
            {
                "age": 7,
                "price": 234,
                "carrier": "Cellular South",
                "id": "lg-axis",
                "imageUrl": "img/phones/lg-axis.0.jpg",
                "name": "LG Axis",
                "snippet": "Android Powered, Google Maps Navigation, 5 Customizable Home Screens"
            },
            {
                "age": 3,
                "price": 234,
                "id": "dell-streak-7",
                "imageUrl": "img/phones/dell-streak-7.0.jpg",
                "name": "Dell Streak 7",
                "snippet": "Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around."
            }
        ];
    function addItemsToCart() {
        for (var i = 0; i < items.length; i++) {
            scope.cart.addItem(items[i]);
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
        scope.cart.removeItem(items[0]);
        scope.$digest();
        expect(element.find('tr').length).toEqual(scope.cart.items.length);
    });
});
