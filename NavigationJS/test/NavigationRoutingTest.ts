﻿/// <reference path="assert.d.ts" />
/// <reference path="mocha.d.ts" />
import assert = require('assert');
import Router = require('../src/routing/Router');
import Navigation = require('../src/Navigation');

describe('MatchTest', function () {
    it('RootMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('/?x=ab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'ab');
    });

    it('RootNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ '), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/a'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('//'), /Url is invalid/, '');
    });

    it('NoParamOneSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'abc', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/abc');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('/abc?x=ab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'ab');
    });

    it('NoParamOneSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'abc', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ abc'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abc '), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/dbc'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/adc'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/aabc'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('NoParamTwoSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/c', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('ab/c');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('ab/c?x=ab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'ab');
    });

    it('NoParamTwoSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/c', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ ab/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/c '), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/a/b/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abc'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ad/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/aab/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('OneParamOneSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/abcd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'abcd');
        Navigation.StateController.navigateLink('/ab?y=cd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'ab');
        assert.equal(Navigation.StateContext.data.y, 'cd');
    });

    it('OneParamOneSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab//'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('OneParamTwoSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/ab/cd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        Navigation.StateController.navigateLink('/ab/cd?y=ef');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        assert.equal(Navigation.StateContext.data.y, 'ef');
    });

    it('OneParamTwoSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ ab/cd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abc/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/d/e'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/a/b/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/cab/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('TwoParamTwoSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/aa/bbb');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'aa');
        assert.equal(Navigation.StateContext.data.y, 'bbb');
        Navigation.StateController.navigateLink('/aa/bbb?z=cccc');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 3);
        assert.equal(Navigation.StateContext.data.x, 'aa');
        assert.equal(Navigation.StateContext.data.y, 'bbb');
        assert.equal(Navigation.StateContext.data.z, 'cccc');
    });

    it('TwoParamTwoSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/aa/bbb/e'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/aa//'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/aa'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('TwoParamThreeSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/{y}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/ab/cd/efg');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        assert.equal(Navigation.StateContext.data.y, 'efg');
        Navigation.StateController.navigateLink('/ab/cd/efg?z=hi');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 3);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        assert.equal(Navigation.StateContext.data.y, 'efg');
        assert.equal(Navigation.StateContext.data.z, 'hi');
    });

    it('TwoParamThreeSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/{y}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ ab/cd/efg'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cde'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cd/efg/h'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab//efg'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('//cd/efg'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('TwoParamFourSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/c/{y}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/ab/yy/c/xyz');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'yy');
        assert.equal(Navigation.StateContext.data.y, 'xyz');
        Navigation.StateController.navigateLink('/ab/yy/c/xyz?z=xx');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 3);
        assert.equal(Navigation.StateContext.data.x, 'yy');
        assert.equal(Navigation.StateContext.data.y, 'xyz');
        assert.equal(Navigation.StateContext.data.z, 'xx');
    });

    it('TwoParamFourSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/c/{y}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ ab/yy/c/xyz'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/b/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/b/c/d/e'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/c'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/b/c//d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab//b/c/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('OneOptionalParamOneSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/abcd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'abcd');
        Navigation.StateController.navigateLink('/abcd?y=ef');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'abcd');
        assert.equal(Navigation.StateContext.data.y, 'ef');
        Navigation.StateController.navigateLink('/');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('/?y=ef');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.y, 'ef');
    });

    it('OneOptionalParamOneSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab//'), /Url is invalid/, '');
    });

    it('OneOptionalParamTwoSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/ab/cd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        Navigation.StateController.navigateLink('/ab/cd?y=ef');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        assert.equal(Navigation.StateContext.data.y, 'ef');
        Navigation.StateController.navigateLink('/ab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('/ab?y=ef');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.y, 'ef');
    });

    it('OneOptionalParamTwoSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ ab/cd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abc/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/d/e'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/a/b/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/abd'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/cab/d'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('TwoOptionalParamTwoSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/aa/bbb');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'aa');
        assert.equal(Navigation.StateContext.data.y, 'bbb');
        Navigation.StateController.navigateLink('/aa/bbb?z=cccc');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 3);
        assert.equal(Navigation.StateContext.data.x, 'aa');
        assert.equal(Navigation.StateContext.data.y, 'bbb');
        assert.equal(Navigation.StateContext.data.z, 'cccc');
        Navigation.StateController.navigateLink('/aab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'aab');
        Navigation.StateController.navigateLink('/aab?z=cccc');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'aab');
        assert.equal(Navigation.StateContext.data.z, 'cccc');
        Navigation.StateController.navigateLink('/');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('/?z=cccc');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.z, 'cccc');
    });

    it('TwoOptionalParamTwoSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/aa/bbb/e'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/aa//'), /Url is invalid/, '');
    });

    it('TwoOptionalParamThreeSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/ab/cd/efg');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        assert.equal(Navigation.StateContext.data.y, 'efg');
        Navigation.StateController.navigateLink('/ab/cd/efg?z=hi');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 3);
        assert.equal(Navigation.StateContext.data.x, 'cd');
        assert.equal(Navigation.StateContext.data.y, 'efg');
        assert.equal(Navigation.StateContext.data.z, 'hi');
        Navigation.StateController.navigateLink('/ab/cde');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'cde');
        Navigation.StateController.navigateLink('/ab/cde?z=fg');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'cde');
        assert.equal(Navigation.StateContext.data.z, 'fg');
        Navigation.StateController.navigateLink('/ab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 0);
        Navigation.StateController.navigateLink('/ab?z=cd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.z, 'cd');
    });

    it('TwoOptionalParamThreeSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/ ab/cd/efg'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab/cd/efg/h'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/ab//efg'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('//cd/efg'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('TwoParamOneOptionalTwoSegmentMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y?}', trackCrumbTrail: false }]}
            ]);
        Navigation.StateController.navigateLink('/aa/bbb');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'aa');
        assert.equal(Navigation.StateContext.data.y, 'bbb');
        Navigation.StateController.navigateLink('/aa/bbb?z=cccc');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 3);
        assert.equal(Navigation.StateContext.data.x, 'aa');
        assert.equal(Navigation.StateContext.data.y, 'bbb');
        assert.equal(Navigation.StateContext.data.z, 'cccc');
        Navigation.StateController.navigateLink('/aab');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 1);
        assert.equal(Navigation.StateContext.data.x, 'aab');
        Navigation.StateController.navigateLink('/aab?z=ccd');
        assert.equal(Object.keys(Navigation.StateContext.data).length, 2);
        assert.equal(Navigation.StateContext.data.x, 'aab');
        assert.equal(Navigation.StateContext.data.z, 'ccd');
    });

    it('TwoParamOneOptionalTwoSegmentNonMatchTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.throws(() => Navigation.StateController.navigateLink('/aa/bbb/e'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/aa//'), /Url is invalid/, '');
        assert.throws(() => Navigation.StateController.navigateLink('/'), /Url is invalid/, '');
    });

    it('TwoParamOneOptionalThreeSegmentMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/{y?}');
        var routeMatch = router.match('ab/cd/efg');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'cd');
        assert.equal(routeMatch.data.y, 'efg');
        routeMatch = router.match('ab/cde');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'cde');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalThreeSegmentNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/{y?}');
        assert.equal(router.match(' ab/cd/efg'), null);
        assert.equal(router.match('ab/cd/efg/h'), null);
        assert.equal(router.match('ab//efg'), null);
        assert.equal(router.match('/cd/efg'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match(''), null);
    });

    it('TwoParamOneOptionalFourSegmentMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/c/{y?}');
        var routeMatch = router.match('ab/yy/c/xyz');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'yy');
        assert.equal(routeMatch.data.y, 'xyz');
        var routeMatch = router.match('ab/yy/c');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'yy');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalFourSegmentNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/c/{y?}');
        assert.equal(router.match(' ab/yy/c/xyz'), null);
        assert.equal(router.match('ab/b/c/d/e'), null);
        assert.equal(router.match('ab/c'), null);
        assert.equal(router.match('ab/b/c//d'), null);
        assert.equal(router.match('ab//b/c/d'), null);
        assert.equal(router.match(''), null);
    });

    it('OneParamOneMixedSegmentMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}');
        var routeMatch = router.match('abcde');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'cde');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('OneParamOneMixedSegmentNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}');
        assert.equal(router.match('ab/cde'), null);
        assert.equal(router.match('abcd//'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match(''), null);
    });

    it('TwoParamOneMixedSegmentMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}e{y}');
        var routeMatch = router.match('abcdefgh');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'cd');
        assert.equal(routeMatch.data.y, 'fgh');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneMixedSegmentNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}e{y}');
        assert.equal(router.match(' abcdefgh'), null);
        assert.equal(router.match('ab/cdefgh'), null);
        assert.equal(router.match('abcdefgh//'), null);
        assert.equal(router.match('abcde'), null);
        assert.equal(router.match('abc'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match(''), null);
    });

    it('TwoParamOneOptionalTwoSegmentOneMixedMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}ab/{y?}');
        var routeMatch = router.match('abcab/de');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'abc');
        assert.equal(routeMatch.data.y, 'de');
        routeMatch = router.match('abcab');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'abc');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalTwoSegmentOneMixedNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}ab/{y?}');
        assert.equal(router.match('abcab /de'), null);
        assert.equal(router.match('abcab/de/fg'), null);
        assert.equal(router.match('abcab//'), null);
        assert.equal(router.match('ab/de'), null);
        assert.equal(router.match(''), null);
    });

    it('OneParamOneSegmentDefaultMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}', { x: 'cde' });
        var routeMatch = router.match('ab');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'ab');
        routeMatch = router.match('');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'cde');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('OneParamOneSegmentDefaultNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}', { x: 'cde' });
        assert.equal(router.match('ab/cd'), null);
        assert.equal(router.match('ab//'), null);
    });

    it('OneParamTwoSegmentDefaultMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}', { x: 'ccdd' });
        var routeMatch = router.match('ab/cde');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'cde');
        routeMatch = router.match('ab');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'ccdd');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('OneParamTwoSegmentDefaultNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}', { x: 'ccdd' });
        assert.equal(router.match(' ab/cd'), null);
        assert.equal(router.match('abc/d'), null);
        assert.equal(router.match('ab/d/e'), null);
        assert.equal(router.match('a/b/d'), null);
        assert.equal(router.match('abd'), null);
        assert.equal(router.match('cab/d'), null);
        assert.equal(router.match(''), null);
    });

    it('TwoParamTwoSegmentTwoDefaultMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab', y: 'c' });
        var routeMatch = router.match('aa/bbb');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'aa');
        assert.equal(routeMatch.data.y, 'bbb');
        routeMatch = router.match('aa');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'aa');
        assert.equal(routeMatch.data.y, 'c');
        routeMatch = router.match('');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'ab');
        assert.equal(routeMatch.data.y, 'c');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamTwoSegmentTwoDefaultNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab', y: 'c' });
        assert.equal(router.match('aa/bbb/e'), null);
        assert.equal(router.match('aa//'), null);
    });

    it('TwoParamTwoSegmentDefaultMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { y: 'ab' });
        var routeMatch = router.match('aa/bbb');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'aa');
        assert.equal(routeMatch.data.y, 'bbb');
        routeMatch = router.match('aa');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'aa');
        assert.equal(routeMatch.data.y, 'ab');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamTwoSegmentDefaultNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { y: 'ab' });
        assert.equal(router.match('aa/bbb/e'), null);
        assert.equal(router.match('aa//'), null);
        assert.equal(router.match(''), null);
    });

    it('TwoParamOneOptionalTwoSegmentDefaultMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y?}', { x: 'abc' });
        var routeMatch = router.match('aa/bbb');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'aa');
        assert.equal(routeMatch.data.y, 'bbb');
        routeMatch = router.match('aab');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'aab');
        routeMatch = router.match('');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'abc');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalTwoSegmentDefaultNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y?}', { x: 'abc' });
        assert.equal(router.match('aa/bbb/e'), null);
        assert.equal(router.match('aa//'), null);
    });

    it('FourParamTwoOptionalFiveSegmentDefaultMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{w}/{x}/{y?}/{z?}', { w: 'abc', x: 'de' });
        var routeMatch = router.match('ab/cd/ef/hi/jk');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 4);
        assert.equal(routeMatch.data.w, 'cd');
        assert.equal(routeMatch.data.x, 'ef');
        assert.equal(routeMatch.data.y, 'hi');
        assert.equal(routeMatch.data.z, 'jk');
        routeMatch = router.match('ab/cde/fg/h');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 3);
        assert.equal(routeMatch.data.w, 'cde');
        assert.equal(routeMatch.data.x, 'fg');
        assert.equal(routeMatch.data.y, 'h');
        routeMatch = router.match('ab/cc/def');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.w, 'cc');
        assert.equal(routeMatch.data.x, 'def');
        routeMatch = router.match('ab/ccdd');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.w, 'ccdd');
        assert.equal(routeMatch.data.x, 'de');
        routeMatch = router.match('ab');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.w, 'abc');
        assert.equal(routeMatch.data.x, 'de');
        assert.equal(route.params.length, 4);
        assert.equal(route.params[0].name, 'w');
        assert.equal(route.params[1].name, 'x');
        assert.equal(route.params[2].name, 'y');
        assert.equal(route.params[3].name, 'z');
    });

    it('FourParamTwoOptionalFiveSegmentDefaultNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{w}/{x}/{y?}/{z?}', { w: 'abc', x: 'de' });
        assert.equal(router.match(' ab/cde/fg/h'), null);
        assert.equal(router.match('ab/cde/fg/h/ij/k'), null);
        assert.equal(router.match('ab/cde/fg/h//'), null);
        assert.equal(router.match('ab/cde/fg//'), null);
        assert.equal(router.match('ab/cd//'), null);
        assert.equal(router.match('ab//'), null);
        assert.equal(router.match(''), null);
    });

    it('SpacesMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}');
        var routeMatch = router.match('   a  ');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, '   a  ');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('MultiCharParamMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('a/{someVar}');
        var routeMatch = router.match('a/someVal');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.someVar, 'someVal');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'someVar');
    });

    it('SlashMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('/abc/');
        var routeMatch = router.match('abc');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 0);
        assert.equal(route.params.length, 0);
    });

    it('MatchSlashTest', function () {
        var router = new Router();
        var route = router.addRoute('abc');
        var routeMatch = router.match('/abc/');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 0);
        assert.equal(route.params.length, 0);
    });

    it('ReservedUrlCharacterMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('a/{*="()\'-_+~@:?><.;[],!£$%^#&}', { '*="()\'-_+~@:?><.;[],!£$%^#&': '*="()\'-__+~@:?><.;[],!£$%^#&' });
        var routeMatch = router.match('a/*%3D%22()\'-_%2B~%40%3A%3F%3E%3C.%3B%5B%5D%2C!%C2%A3%24%25%5E%23%26');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data['*="()\'-_+~@:?><.;[],!£$%^#&'], '*="()\'-_+~@:?><.;[],!£$%^#&');
        var routeMatch = router.match('a');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data['*="()\'-_+~@:?><.;[],!£$%^#&'], '*="()\'-__+~@:?><.;[],!£$%^#&');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, '*="()\'-_+~@:?><.;[],!£$%^#&');
    });

    it('ReservedRegexCharacterMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('.+*\^$\[\]()\'/{x}');
        var routeMatch = router.match('.+*\^$\[\]()\'/abc');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'abc');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('OneParamOptionalMandatoryOneMixedSegmentMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x?}');
        var routeMatch = router.match('abcde');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'cde');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('OneParamOptionalMandatoryOneMixedSegmentNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x?}');
        assert.equal(router.match('ab/cde'), null);
        assert.equal(router.match('abcd//'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match(''), null);
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('TwoParamOneOptionalMandatoryThreeSegmentMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}');
        var routeMatch = router.match('ab/cd/efg');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'cd');
        assert.equal(routeMatch.data.y, 'efg');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalMandatoryThreeSegmentNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}');
        assert.equal(router.match(' ab/cd/efg'), null);
        assert.equal(router.match('ab/cd/efg/h'), null);
        assert.equal(router.match('ab//efg'), null);
        assert.equal(router.match('/cd/efg'), null);
        assert.equal(router.match('ab/cde'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match(''), null);
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamTwoSegmentDefaultMandatoryMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab' });
        var routeMatch = router.match('aa/bbb');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'aa');
        assert.equal(routeMatch.data.y, 'bbb');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamTwoSegmentDefaultMandatoryNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab' });
        assert.equal(router.match('aa/bbb/e'), null);
        assert.equal(router.match('aa//'), null);
        assert.equal(router.match('aa'), null);
        assert.equal(router.match(''), null);
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalMandatoryFourSegmentDefaultMandatoryMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}/c', { y: 'ee' });
        var routeMatch = router.match('ab/cd/efg/c');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'cd');
        assert.equal(routeMatch.data.y, 'efg');
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('TwoParamOneOptionalMandatoryFourSegmentDefaultMandatoryMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}/c', { y: 'ee' });
        assert.equal(router.match(' ab/cd/efg/c'), null);
        assert.equal(router.match('ab/cd/efg'), null);
        assert.equal(router.match('ab/cd'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match('ab/cd/efg/c//'), null);
        assert.equal(router.match('ab//efg/c'), null);
        assert.equal(router.match('ab/cd//c'), null);
        assert.equal(router.match('ab///c'), null);
        assert.equal(router.match('ab/c'), null);
        assert.equal(router.match(''), null);
        assert.equal(route.params.length, 2);
        assert.equal(route.params[0].name, 'x');
        assert.equal(route.params[1].name, 'y');
    });

    it('ExtraDefaultsMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}', { x: 'a', y: 'b' });
        var routeMatch = router.match('');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 2);
        assert.equal(routeMatch.data.x, 'a');
        assert.equal(routeMatch.data.y, 'b');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('CaseInsensitiveMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('abc/{x}');
        var routeMatch = router.match('AbC/aBc');
        assert.equal(routeMatch.route, route);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'aBc');
        assert.equal(route.params.length, 1);
        assert.equal(route.params[0].name, 'x');
    });

    it('MultipleRoutesMatchTest', function () {
        var router = new Router();
        var route1 = router.addRoute('ab/{x}');
        var route2 = router.addRoute('cd/{x}');
        var routeMatch = router.match('ab/ef');
        assert.equal(routeMatch.route, route1);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'ef');
        assert.equal(route1.params.length, 1);
        assert.equal(route1.params[0].name, 'x');
        routeMatch = router.match('cd/ef');
        assert.equal(routeMatch.route, route2);
        assert.equal(Object.keys(routeMatch.data).length, 1);
        assert.equal(routeMatch.data.x, 'ef');
        assert.equal(route2.params.length, 1);
        assert.equal(route2.params[0].name, 'x');
    });

    it('MultipleRoutesNonMatchTest', function () {
        var router = new Router();
        var route1 = router.addRoute('ab/{x}');
        var route2 = router.addRoute('cd/{x}');
        assert.equal(router.match('aa/bbb'), null);
        assert.equal(router.match('ab'), null);
        assert.equal(router.match('cd'), null);
    });
});

describe('BuildTest', function () {
    it('RootBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'ab' }), '/?x=ab');
    });

    it('NoParamOneSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'abc', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/abc');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'ab' }), '/abc?x=ab');
    });

    it('NoParamTwoSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/c', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/ab/c');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'ab' }), '/ab/c?x=ab');
    });

    it('OneParamOneSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'abcd' }), '/abcd');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'ab', y: 'cd' }), '/ab?y=cd');
    });

    it('OneParamOneSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d'), null);
    });

    it('OneParamTwoSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd' }), '/ab/cd');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd', y: 'ef' }), '/ab/cd?y=ef');
    });

    it('OneParamTwoSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d'), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'ef' }), null);
    });

    it('TwoParamTwoSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aa', y: 'bbb', z: 'cccc' }), '/aa/bbb?z=cccc');
    });

    it('TwoParamTwoSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { x: 'aa' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'bbb' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { z: 'cccc' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d'), null);
    });

    it('TwoParamThreeSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/{y}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd', y: 'efg' }), '/ab/cd/efg');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd', y: 'efg', z: 'hi' }), '/ab/cd/efg?z=hi');
    });

    it('TwoParamThreeSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { x: 'cd' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'efg' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { z: 'hi' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d'), null);
    });

    it('TwoParamFourSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/c/{y}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'yy', y: 'xyz' }), '/ab/yy/c/xyz');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'yy', y: 'xyz', z: 'xx' }), '/ab/yy/c/xyz?z=xx');
    });

    it('TwoParamFourSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x}/c/{y}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { x: 'yy' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'xyz' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { z: 'zz' }), null);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d'), null);
    });

    it('OneOptionalParamOneSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'abcd' }), '/abcd');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'abcd', y: 'ef' }), '/abcd?y=ef');
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/');
        assert.equal(Navigation.StateController.getNavigationLink('d', { y: 'ef' }), '/?y=ef');
    });

    it('OneOptionalParamTwoSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd' }), '/ab/cd');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd', y: 'ef' }), '/ab/cd?y=ef');
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/ab');
        assert.equal(Navigation.StateController.getNavigationLink('d', { y: 'ef' }), '/ab?y=ef');
    });

    it('TwoOptionalParamTwoSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aa', y: 'bbb', z: 'cccc' }), '/aa/bbb?z=cccc');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aab' }), '/aab');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aab', z: 'cccc' }), '/aab?z=cccc');
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/');
        assert.equal(Navigation.StateController.getNavigationLink('d', { z: 'cccc' }), '/?z=cccc');
    });

    it('TwoOptionalParamTwoSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'bbb' }), null);
    });

    it('TwoOptionalParamThreeSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd', y: 'efg' }), '/ab/cd/efg');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cd', y: 'efg', z: 'hi' }), '/ab/cd/efg?z=hi');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cde' }), '/ab/cde');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'cde', z: 'fg' }), '/ab/cde?z=fg');
        assert.equal(Navigation.StateController.getNavigationLink('d'), '/ab');
        assert.equal(Navigation.StateController.getNavigationLink('d', { z: 'cd' }), '/ab?z=cd');
    });

    it('TwoOptionalParamThreeSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: 'ab/{x?}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'efg' }), null);
    });

    it('TwoParamOneOptionalTwoSegmentBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aa', y: 'bbb', z: 'cccc' }), '/aa/bbb?z=cccc');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aab' }), '/aab');
        assert.equal(Navigation.StateController.getNavigationLink('d', { x: 'aab', z: 'ccd' }), '/aab?z=ccd');
    });

    it('TwoParamOneOptionalTwoSegmentNonBuildTest', function () {
        Navigation.StateInfoConfig.build(<any> [
            { key: 'd', initial: 's', states: [
                { key: 's', route: '{x}/{y?}', trackCrumbTrail: false }]}
            ]);
        assert.strictEqual(Navigation.StateController.getNavigationLink('d', { y: 'bbb' }), null);
    });

    it('TwoParamOneOptionalThreeSegmentBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/{y?}');
        assert.equal(route.build({ x: 'cd', y: 'efg' }), '/ab/cd/efg');
        assert.equal(route.build({ x: 'cde' }), '/ab/cde');
    });

    it('TwoParamOneOptionalThreeSegmentBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/{y?}');
        assert.equal(route.build({ y: 'efg' }), null);
        assert.equal(route.build(), null);
    });

    it('TwoParamOneOptionalFourSegmentNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/c/{y?}');
        assert.equal(route.build({ x: 'yy', y: 'xyz' }), '/ab/yy/c/xyz');
        assert.equal(route.build({ x: 'yy' }), '/ab/yy/c');
    });

    it('TwoParamOneOptionalFourSegmentNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}/c/{y?}');
        assert.equal(route.build({ y: 'xyz' }), null);
        assert.equal(route.build(), null);
    });

    it('OneParamOneMixedSegmentBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}');
        assert.equal(route.build({ x: 'cde' }), '/abcde');
    });

    it('OneParamOneMixedSegmentNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}');
        assert.equal(route.build(), null);
    });

    it('TwoParamOneMixedSegmentBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}e{y}');
        assert.equal(route.build({ x: 'cd', y: 'fgh' }), '/abcdefgh');
    });

    it('TwoParamOneMixedSegmentNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x}e{y}');
        assert.equal(route.build({ x: 'cd' }), null);
        assert.equal(route.build({ y: 'fgh' }), null);
        assert.equal(route.build(), null);
    });

    it('TwoParamOneOptionalTwoSegmentOneMixedBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}ab/{y?}');
        assert.equal(route.build({ x: 'abc', y: 'de' }), '/abcab/de');
        assert.equal(route.build({ x: 'abc' }), '/abcab');
    });

    it('TwoParamOneOptionalTwoSegmentOneMixedNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}ab/{y?}');
        assert.equal(route.build({ y: 'de' }), null);
        assert.equal(route.build(), null);
    });

    it('OneParamOneSegmentDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}', { x: 'cde' });
        assert.equal(route.build({ x: 'ab' }), '/ab');
        assert.equal(route.build({ x: 'cde' }), '/');
        assert.equal(route.build(), '/');
    });

    it('OneParamTwoSegmentDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x}', { x: 'ccdd' });
        assert.equal(route.build({ x: 'cde' }), '/ab/cde');
        assert.equal(route.build({ x: 'ccdd' }), '/ab');
        assert.equal(route.build(), '/ab');
    });

    it('TwoParamTwoSegmentTwoDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab', y: 'c' });
        assert.equal(route.build({ x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(route.build({ x: 'aa', y: 'c' }), '/aa');
        assert.equal(route.build({ y: 'bbb' }), '/ab/bbb');
        assert.equal(route.build({ y: 'c' }), '/');
        assert.equal(route.build({ x: 'aa' }), '/aa');
        assert.equal(route.build({ x: 'ab', y: 'c' }), '/');
        assert.equal(route.build({ x: 'ab' }), '/');
        assert.equal(route.build(), '/');
    });

    it('TwoParamTwoSegmentDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { y: 'ab' });
        assert.equal(route.build({ x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(route.build({ x: 'aa', y: 'ab' }), '/aa');
        assert.equal(route.build({ x: 'aa' }), '/aa');
    });

    it('TwoParamTwoSegmentDefaultNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { y: 'ab' });
        assert.equal(route.build({ y: 'bbb' }), null);
    });

    it('TwoParamOneOptionalTwoSegmentDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y?}', { x: 'abc' });
        assert.equal(route.build({ x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(route.build({ x: 'abc', y: 'bbb' }), '/abc/bbb');
        assert.equal(route.build({ y: 'bbb' }), '/abc/bbb');
        assert.equal(route.build({ x: 'aab' }), '/aab');
        assert.equal(route.build({ x: 'abc' }), '/');
        assert.equal(route.build(), '/');
    });

    it('FourParamTwoOptionalFiveSegmentDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{w}/{x}/{y?}/{z?}', { w: 'abc', x: 'de' });
        assert.equal(route.build({ w: 'cd', x: 'ef', y: 'hi', z: 'jk' }), '/ab/cd/ef/hi/jk');
        assert.equal(route.build({ w: 'cd', x: 'de', y: 'hi', z: 'jk' }), '/ab/cd/de/hi/jk');
        assert.equal(route.build({ w: 'abc', x: 'ef', y: 'hi', z: 'jk' }), '/ab/abc/ef/hi/jk');
        assert.equal(route.build({ w: 'abc', x: 'de', y: 'hi', z: 'jk' }), '/ab/abc/de/hi/jk');
        assert.equal(route.build({ x: 'ef', y: 'hi', z: 'jk' }), '/ab/abc/ef/hi/jk');
        assert.equal(route.build({ x: 'de', y: 'hi', z: 'jk' }), '/ab/abc/de/hi/jk');
        assert.equal(route.build({ x: 'de', y: 'hi' }), '/ab/abc/de/hi');
        assert.equal(route.build({ x: 'ef' }), '/ab/abc/ef');
        assert.equal(route.build({ x: 'de' }), '/ab');
        assert.equal(route.build({ y: 'hi', z: 'jk' }), '/ab/abc/de/hi/jk');
        assert.equal(route.build({ y: 'hi' }), '/ab/abc/de/hi');
        assert.equal(route.build({ w: 'cde', x: 'fg', y: 'h' }), '/ab/cde/fg/h');
        assert.equal(route.build({ w: 'abc', x: 'de', y: 'h' }), '/ab/abc/de/h');
        assert.equal(route.build({ w: 'cde', y: 'h', z: 'jk' }), '/ab/cde/de/h/jk');
        assert.equal(route.build({ w: 'abc', y: 'h', z: 'jk' }), '/ab/abc/de/h/jk');
        assert.equal(route.build({ w: 'cde', y: 'h' }), '/ab/cde/de/h');
        assert.equal(route.build({ w: 'abc', y: 'h' }), '/ab/abc/de/h');
        assert.equal(route.build({ w: 'cc', x: 'def' }), '/ab/cc/def');
        assert.equal(route.build({ w: 'cc', x: 'de' }), '/ab/cc');
        assert.equal(route.build({ w: 'abc', x: 'de' }), '/ab');
        assert.equal(route.build({ w: 'abc', x: 'def' }), '/ab/abc/def');
        assert.equal(route.build({ w: 'ccdd' }), '/ab/ccdd');
        assert.equal(route.build({ w: 'abc' }), '/ab');
        assert.equal(route.build(), '/ab');
    });

    it('FourParamTwoOptionalFiveSegmentDefaultBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{w}/{x}/{y?}/{z?}', { w: 'abc', x: 'de' });
        assert.equal(route.build({ z: 'jk' }), null);
        assert.equal(route.build({ w: 'cde', z: 'jk' }), null);
        assert.equal(route.build({ w: 'abc', z: 'jk' }), null);
        assert.equal(route.build({ x: 'fg', z: 'jk' }), null);
        assert.equal(route.build({ x: 'de', z: 'jk' }), null);
        assert.equal(route.build({ w: 'abc', x: 'fg', z: 'jk' }), null);
        assert.equal(route.build({ w: 'cde', x: 'de', z: 'jk' }), null);
        assert.equal(route.build({ w: 'cde', x: 'fg', z: 'jk' }), null);
        assert.equal(route.build({ w: 'abc', x: 'de', z: 'jk' }), null);
    });

    it('SpacesBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}');
        assert.equal(route.build({ x: '   a  ' }), '/%20%20%20a%20%20');
    });

    it('MultiCharParamBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('a/{someVar}');
        assert.equal(route.build({ someVar: 'someVal' }), '/a/someVal');
    });

    it('SlashBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('/abc/');
        assert.equal(route.build(), '/abc');
    });

    it('ReservedUrlCharacterBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('a/{*="()\'-_+~@:?><.;[],!£$%^#&}', { '*="()\'-_+~@:?><.;[],!£$%^#&': '*="()\'-__+~@:?><.;[],!£$%^#&' });
        assert.equal(route.build({ '*="()\'-_+~@:?><.;[],!£$%^#&': '*="()\'-_+~@:?><.;[],!£$%^#&' }), '/a/*%3D%22()\'-_%2B~%40%3A%3F%3E%3C.%3B%5B%5D%2C!%C2%A3%24%25%5E%23%26');
        assert.equal(route.build({ '*="()\'-_+~@:?><.;[],!£$%^#&': '*="()\'-__+~@:?><.;[],!£$%^#&' }), '/a');
        assert.equal(route.build(), '/a');
    });

    it('ReservedRegexCharacterBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('.+*\^$\[\]()\'/{x}');
        assert.equal(route.build({ x: 'abc' }), '/.+*\^$\[\]()\'/abc');
    });

    it('OneParamOptionalMandatoryOneMixedSegmentBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x?}');
        assert.equal(route.build({ x: 'cde' }), '/abcde');
    });

    it('OneParamOptionalMandatoryOneMixedSegmentNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab{x?}');
        assert.equal(route.build(), null);
    });

    it('TwoParamOneOptionalMandatoryThreeSegmentBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}');
        assert.equal(route.build({ x: 'cd', y: 'efg' }), '/ab/cd/efg');
    });

    it('TwoParamOneOptionalMandatoryThreeSegmentNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}');
        assert.equal(route.build({ x: 'cd' }), null);
        assert.equal(route.build({ y: 'efg' }), null);
        assert.equal(route.build(), null);
    });

    it('TwoParamTwoSegmentDefaultMandatoryBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab' });
        assert.equal(route.build({ x: 'aa', y: 'bbb' }), '/aa/bbb');
        assert.equal(route.build({ y: 'bbb' }), '/ab/bbb');
    });

    it('TwoParamTwoSegmentDefaultMandatoryNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}/{y}', { x: 'ab' });
        assert.equal(route.build({ x: 'aa' }), null);
        assert.equal(route.build(), null);
    });

    it('TwoParamOneOptionalMandatoryFourSegmentDefaultMandatoryBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}/c', { y: 'ee' });
        assert.equal(route.build({ x: 'cd', y: 'efg' }), '/ab/cd/efg/c');
        assert.equal(route.build({ x: 'cd' }), '/ab/cd/ee/c');
    });

    it('TwoParamOneOptionalMandatoryFourSegmentDefaultMandatoryNonBuildTest', function () {
        var router = new Router();
        var route = router.addRoute('ab/{x?}/{y}/c', { y: 'ee' });
        assert.equal(route.build({ y: 'efg' }), null);
        assert.equal(route.build(), null);
    });

    it('ExtraDataMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}');
        assert.equal(route.build({ x: 'a', y: 'b' }), '/a');
    });

    it('EmptyStringNonMatchTest', function () {
        var router = new Router();
        var route = router.addRoute('{x}');
        assert.equal(route.build({ x: '' }), null);
    });
})
