const { suite: testSuite, test } = require('mocha');
const { strict: assert } = require('assert');

const get = require('../config.json');
const { validateFetchAdminSession } = require('../../src/validations/admin');
const { log } = require('../../utils/logging');


testSuite('VALIDATION: validateFetchAdminSession(data: any)', function () {
    const data = {
        email: get.ADMIN_EMAIL,
        password: get.ADMIN_PASSWORD
    };
    
    test('should return errorMessage if data is not passed', function (done) {
        const result = validateFetchAdminSession();
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if data is not proper', function (done) {
        let result = validateFetchAdminSession(null);
        
        assert.strictEqual(typeof result, 'object');
        let { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        let listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        result = validateFetchAdminSession('');
        
        assert.strictEqual(typeof result, 'object');
        ({ status, message } = result);
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        listOfMessages = message.split('\n');
        for (let msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if data is blank object', function (done) {
        const result = validateFetchAdminSession({});
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if email is missing', function (done) {
        const result = validateFetchAdminSession({
            password: data.password,
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if email is incorrect', function (done) {
        const result = validateFetchAdminSession({
            email: 'something@anything',
            password: data.password
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.strictEqual(msg, 'Email is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if password is missing', function (done) {
        const result = validateFetchAdminSession({
            email: data.email
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if password is incorrect', function (done) {
        const result = validateFetchAdminSession({
            email: data.email,
            password: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, true);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.strictEqual(msg, 'Password is invalid.');
        }
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateFetchAdminSession(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.strictEqual(status, false);
        assert.ok(Array.isArray(message));
        assert.ok(message.length === 0);
        
        done();
    });
});