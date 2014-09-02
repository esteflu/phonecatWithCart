'use strict';

describe('unittests for Phone and Cart factories', function () {

    var phone, cart,
        cookieService,
        mock;

    beforeEach(module('phonecatApp'));
    beforeEach(module('mockedDataModule'));
    beforeEach(inject(function (Phone, Cart, CookieService, mockData) {
        phone = Phone;
        cart = Cart;
        cookieService = CookieService;
        mock = mockData;

    }));

    it('check the existence of Phone factory', function () {
        expect(phone).toBeDefined();
    });

    it('check the existence of Cart factory', function () {
        expect(cart).toBeDefined();
    });

    it('check the existence of CookieService', function () {
        expect(cookieService).toBeDefined();
    });

    it('When adding phones to cart, total amount should be updated', function () {
        cart.addItem(mock[0]);
        var totalAmountForOneItem = cart.totalAmount;
        cart.addItem(mock[1]);
        expect(cart.totalAmount).toBeGreaterThan(totalAmountForOneItem);
    });

    it('When removing phones to cart, total amount should be updated', function () {
        cart.addItem(mock[0]);
        cart.addItem(mock[1]);
        var totalAmountForTwoItems = cart.totalAmount;
        cart.removeItem(mock[0]);
        expect(cart.totalAmount).toBeLessThan(totalAmountForTwoItems);
    });
});