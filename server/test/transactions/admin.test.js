const { suite: testSuite, test } = require('mocha');
const { strict: assert } = require('assert');

const get = require('../config.json');
const { fetchAdminSessionTransaction } = require('../../src/transactions/admin.transactions');
const { getNodeCache } = require('../../src/middlewares/cachingModule');

testSuite('Transaction: fetchAdminSessionTransaction(data: object): string | null', function () {
    const data = {
        email: get.ADMIN_EMAIL,
        password: get.ADMIN_PASSWORD
    };
    
    test('should throw error if data is missing', function (done) {
        try {
            fetchAdminSessionTransaction();
        } catch (error) {
            assert.ok(error.message);
            done();
        }
        
        assert.ok(false);
    });
    test('should throw error if data is null', function (done) {
        try {
            fetchAdminSessionTransaction(null);
        } catch (error) {
            assert.ok(error.message);
            done();
        }
        
        assert.ok(false);
    });
    test('should return null if data is primitive', function (done) {
        let result = fetchAdminSessionTransaction('');
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = fetchAdminSessionTransaction(11.11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        result = fetchAdminSessionTransaction(11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = fetchAdminSessionTransaction(11n);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = fetchAdminSessionTransaction(true);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        done();
    });
    test('should return null if data is blank object', function (done) {
        const result = fetchAdminSessionTransaction({});
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        done();
    });
    test('should return null if email is missing', function (done) {
        const result = fetchAdminSessionTransaction({
            ...data,
            email: undefined,
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        done();
    });
    test('should return null if email is incorrect', function (done) {
        const result = fetchAdminSessionTransaction({
            ...data,
            email: 'something@anything',
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        done();
    });
    test('should return null if password is missing', function (done) {
        const result = fetchAdminSessionTransaction({
            ...data,
            password: undefined
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        done();
    });
    test('should return null if password is incorrect', function (done) {
        const result = fetchAdminSessionTransaction({
            ...data,
            password: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        done();
    });
    test('should return sessionid if data is correct', function (done) {
        const result = fetchAdminSessionTransaction(data);
        
        assert.strictEqual(typeof result, 'string');
        assert.strictEqual(result, getNodeCache(get.ADMIN_SESSION_ID));
        
        done();
    });
});