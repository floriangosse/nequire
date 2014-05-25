/*
 * nequire
 * https://github.com/floriangosse/nequire
 *
 * Copyright (c) 2014 Florian Goße
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    _ = require('lodash');

/**
 * Load a module by namespace and module.
 * @param  {String} ns     The namespace where the module is located
 * @param  {String} module The path of module which is located in module
 * @return {Mixed}         The module
 */
function nequire (ns, module) {
    // require the module
    return require(nequire.resolve(ns,module));
}

/**
 * Initialize empty map.
 * @type {Object}
 */
nequire.map = {};

/**
 * Configure namespace map for nequire.
 * @param  {Object} map The map of namespaces and paths
 * @return {Object}     nequire module
 */
nequire.configure = function (map) {
    // check if map is a plain object
    if (!_.isPlainObject(map)) {
        throw new Error('Map must be a plain object.');
    }
    // set new map
    this.map = map;

    return this;
};

/**
 * Resolve path by namespace and module.
 * @param  {String} ns     The namespace where the module is located
 * @param  {String} module The path of module which is located in module
 * @return {String}        The full path of module
 */
nequire.resolve = function (ns, module) {
    // check if namespace is a string
    if (!_.isString(ns)) {
        throw new TypeError('Namespace must be a string.');
    }

    // check if namespace is configured
    if (!this.map.hasOwnProperty(ns)) {
        throw new Error('Namespace ' + ns + ' is not available.');
    }

    // check if module is not empty
    if (!module) {
        module = false;
    } else {
        // check if module is a string
        if (!_.isString(module)) {
            throw new TypeError('Module must be a string.');
        } else {
            // remove leading slash
            if (module.indexOf('/') === 0) {
                module = module.substr(1);
            }
        }
    }

    var namespacePath = path.resolve(this.map[ns]);
    var modulePath = namespacePath + ((module) ? '/' + module : '');

    return require.resolve(modulePath);
};

/**
 * Globalize nequire for project wide use.
 * @param  {String} name The optional name where nequire should be accessible
 * @return {Object}      nequire module
 */
nequire.globalize = function (name) {
    name = name || 'nequire';

    // check if name is a string
    if (!_.isString(name)) {
        throw new TypeError('Name must be string.');
    }

    // check if name is already used globally
    if (global.hasOwnProperty(name)) {
        throw new Error('Name ' + name + ' is already in use.');
    }

    // globalize nequire
    global[name] = this;

    return this;
};

// export module
module.exports = nequire;

nequire.test = function (g) {
    console.log((global === g) ? 'equal' : 'not equal');
};