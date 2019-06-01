const { strict: assert } = require('assert');
const { before, after } = require('mocha');

const { get } = require('../../src/conf/index');
const devJSON = require('../../src/conf/dev.json');
const prodJSON = require('../../src/conf/prod.json');
const log = require('../../utils/logging');

describe('get(key)', function () {
    it('should return values from dev.json in any mode', function () {
        for (let key in devJSON) {
            assert.strictEqual(get(key), devJSON[key]);
        }
    });
    it('should return values from dev.json in prod mode', function () {
        process.env.NODE_ENV = 'prod';
        for (let key in prodJSON) {
            assert.strictEqual(get(key), prodJSON[key]);
        }
    });
    after(() => {
        delete process.env.NODE_ENV;
    });
});