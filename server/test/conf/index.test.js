const { strict: assert } = require('assert');
const { after, suite: testSuite, test } = require('mocha');

const { get } = require('../../src/conf/index');
const devJSON = require('../../src/conf/dev.json');
const prodJSON = require('../../src/conf/prod.json');

testSuite('CONF: get(key)', function () {
    test('should return values from dev.json in non-prod mode', function () {
        for (let key in devJSON) {
            assert.strictEqual(get(key), devJSON[key]);
        }
    });
    test('should return values from prod.json in prod mode', function () {
        process.env.NODE_ENV = 'prod';
        for (let key in prodJSON) {
            assert.strictEqual(get(key), prodJSON[key]);
        }
    });
    after(() => {
        process.env.NODE_ENV = test;
    });
});