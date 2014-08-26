'use strict';

/* Directives */

var phonecatDirectives = angular.module('phonecatDirectives', []);

phonecatDirectives.directive('dropDownMenu',
    function () {
        return {
            restrict: "E",
            scope : false,
            replace: true,
            templateUrl: "partials/dropMenu.html",
            link: function (scope, element, attrs) {
                
                toggleDropDown(200);

                function toggleDropDown(duration) {
                    if (hasParent(element)) {
                        element.parent().bind('click', function (event) {
                            if (isCartPopulated() && !isTrashCan(event.target)) {
                                element.slideToggle(duration, function() {});
                            } else if (!isTrashCan(event.target) || !isCartPopulated()) {
                                element.hide(duration, function(){});
                            }
                        });
                    } else {
                        throw "dropdown menu has no trigger";
                    }
                }

                function isCartPopulated() {
                    return scope.cart.size > 0;
                }

                function hasParent(element) {
                    return element.parent() != undefined;
                }

                function isTrashCan(eventTarget) {
                    return $(eventTarget).hasClass('trash');
                }

            }
        };
    });
