'use strict'

var mockedDataModule = angular.module('mockedDataModule', []);

mockedDataModule.value('mockData',
    [
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
    ]
);
