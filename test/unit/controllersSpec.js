'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('phonecatApp'));
    beforeEach(module('phonecatServices'));

    /* each controller test  */
    describe('PhoneListCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([
                    {name: 'Nexus S'},
                    {name: 'Motorola DROID'}
                ]);

            scope = $rootScope.$new();
            ctrl = $controller('PhoneListCtrl', {$scope: scope});
        }));


        it('should create "phones" model with 2 phones fetched from xhr', function () {
            expect(scope.phones).toEqualData([]);
            $httpBackend.flush();

            expect(scope.phones).toEqualData(
                [
                    {name: 'Nexus S'},
                    {name: 'Motorola DROID'}
                ]);
        });


        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });


    describe('PhoneDetailCtrl', function () {
        var scope, $httpBackend, ctrl,
            xyzPhoneData = function () {
                return {
                    name: 'phone xyz',
                    images: ['image/url1.png', 'image/url2.png']
                }
            };


        beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

            $routeParams.phoneId = 'xyz';
            scope = $rootScope.$new();
            ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
        }));


        it('should fetch phone detail', function () {
            expect(scope.phone).toEqualData({});
            $httpBackend.flush();

            expect(scope.phone).toEqualData(xyzPhoneData());
        });
    });

    describe('PhoneCartCtrl', function () {
        var scope, ctrl, cart;

        beforeEach(inject(function ($rootScope, $controller, Cart) {
            scope = $rootScope.$new();
            ctrl = $controller('PhoneCartCtrl', { $scope: scope });
            cart = Cart;
        }));

        it('should contain gui text object with key-value pairs', function () {
            expect(scope.cartText).toEqualData({itemSingular: "item", itemPlural: "items", checkout: "Checkout"})
        });

        it('should have a defined cart', function () {
            expect(scope.cart).toEqualData(cart);
        });

    });

    describe('PhoneCartCheckoutCtrl', function () {
        var scope, ctrl, cookieService, cookie,
            cart = {items: [], totalAmount: 0, size: 0, TITLE: 'Cart', cookieManager: cookieService};

        beforeEach(inject(function ($rootScope, $controller, CookieService) {
            scope = $rootScope.$new();
            cookieService = CookieService;
            cookieService.setCookie(cart.TITLE, cart);
            ctrl = $controller('PhoneCartCheckoutCtrl', { $scope: scope });
        }));

        it('should contain gui text object with key-value pairs', function () {
            expect(scope.orderText).toEqualData({confirmation: "Order confirmation", totalAmount: "Total amount"});
        });

        it('should get cookie', function () {
            expect(scope.order).toEqualData(cookieService.getCookie(cart.TITLE));
        });
    });
});
