'use strict';

exports.radius = function() {
    return 3390;
};

exports.diameter = function() {
    return this.radius() * 2;
};