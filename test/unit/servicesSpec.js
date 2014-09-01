'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('phonecatApp'));

    var phone, cart;
    var mockItems =  [
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
    beforeEach(inject(function (Phone, Cart) {
      phone = Phone;
      cart = Cart;
    }));

    it('check the existence of Phone factory', function() {
        expect(phone).toBeDefined();
    });

    it('check the existence of Cart factory', function() {
        expect(cart).toBeDefined();
    });
    
    it('When adding to phones to Cart price should be updated', function() {
       //TODO check price update
       cart.addItem(mockItems[0]);
        console.log("", cart.totalAmount);
        
       
    });

});