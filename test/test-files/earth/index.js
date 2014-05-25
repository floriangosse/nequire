'use strict';

exports.radius = function() {
    return 6371;
};

exports.diameter = function() {
    return this.radius() * 2;
};