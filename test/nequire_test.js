'use strict';

var path = require('path'),
    root = path.resolve(__dirname + '/..'),
    files = root + '/test/test-files';

exports.basics = {
    setUp: function (done) {
        this.nequire = require('../lib/nequire.js');
        done();
    },
    tearDown: function (done) {
        delete this.nequire;
        done();
    },
    'configure': function (test) {
        test.expect(1);

        var nequire = this.nequire;

        var map = {
            'earth': files + '/earth',
            'mars': files + '/mars',
            'creature': files + '/earth/creature'
        };

        nequire.configure(map);

        test.deepEqual(nequire.map, map);

        test.done();
    },
    'resolve': function (test) {
        test.expect(5);

        var nequire = this.nequire;

        test.strictEqual(
            nequire.resolve('earth'),
            files + '/earth/index.js'
        );
        test.strictEqual(
            nequire.resolve('earth', 'index'),
            files + '/earth/index.js'
        );

        test.strictEqual(
            nequire.resolve('mars'),
            files + '/mars/index.js'
        );

        // there is no index file in (files + '/earth/creature')
        test.throws(function () {
            nequire.resolve('creature');
        }, Error);

        test.strictEqual(
            nequire.resolve('creature', 'human'),
            files + '/earth/creature/human.js'
        );

        test.done();
    },
    'require': function (test) {
        test.expect(8);

        var nequire = this.nequire;

        var earth = nequire('earth');
        test.equal(earth.radius(), 6371);
        test.equal(earth.diameter(), 12742);

        var rock = nequire('earth', 'rock');
        test.equal(rock.say(), 'I am a rock and I can not speak.');

        var mars = nequire('mars');
        test.equal(mars.radius(), 3390);
        test.equal(mars.diameter(), 6780);

        var human = nequire('creature', 'human');
        test.equal(human.say(), 'I am a human and I live on the earth.');

        var earthHuman = nequire('earth', 'creature/human');
        test.equal(earthHuman.say(), 'I am a human and I live on the earth.');

        test.equal(earthHuman, human);

        test.done();
    }
};


exports.globalize = {
    setUp: function (done) {
        this.nequire = require('../lib/nequire.js');
        done();
    },
    tearDown: function (done) {
        delete global.nequire;
        delete this.nequire;
        done();
    },
    'default name': function (test) {
        test.expect(2);

        // globalize nequire
        this.nequire.globalize();

        test.ok(global.hasOwnProperty('nequire'));
        test.ok(global.nequire instanceof Function);

        test.done();

    },
    'custom name': function (test) {
        test.expect(2);

        var name = 'my-nequire';

        // globalize nequire with custom name
        this.nequire.globalize(name);

        test.ok(global.hasOwnProperty(name));
        test.ok(global[name] instanceof Function);

        test.done();
    }
};