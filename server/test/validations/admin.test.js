const { suite: testSuite, test } = require('mocha');
const { strict: assert } = require('assert');
const uuid = require('uuid');
const mongoose = require('mongoose');

const get = require('../config.json');
const { validateFetchAdminSession, validateToggleUserActive, validateCreateUserSession } = require('../../src/validations/admin');


testSuite('VALIDATION: validateFetchAdminSession(data: object): object', function () {
    const data = {
        email: get.ADMIN_EMAIL,
        password: get.ADMIN_PASSWORD
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateFetchAdminSession();
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(status);
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
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(message.length === 0);
        
        done();
    });
});

testSuite('VALIDATION: validateToggleUserActive(data: object): object', function () {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        isActive: true,
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateToggleUserActive();
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
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
        let result = validateToggleUserActive(null);
        
        assert.strictEqual(typeof result, 'object');
        let { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        let listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        result = validateToggleUserActive('');
        
        assert.strictEqual(typeof result, 'object');
        ({ status, message } = result);
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
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
        const result = validateToggleUserActive({});
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if _id is missing', function (done) {
        const result = validateToggleUserActive({
            isActive: data.isActive,
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if _id is incorrect', function (done) {
        const result = validateToggleUserActive({
            _id: uuid.v1(),
            isActive: data.isActive
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.strictEqual(msg, 'User Id is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if isActive is missing', function (done) {
        const result = validateToggleUserActive({
            _id: data._id
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if isActive is incorrect', function (done) {
        const result = validateToggleUserActive({
            _id: data._id,
            isActive: null
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.strictEqual(msg, 'isActive is invalid.');
        }
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateToggleUserActive(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(message.length === 0);
        
        done();
    });
});

testSuite('VALIDATION: validateCreateUserSession(data: string): object', function () {
    const data =  new mongoose.Types.ObjectId();
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateCreateUserSession();
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
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
        let result = validateCreateUserSession(null);
        
        assert.strictEqual(typeof result, 'object');
        let { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        let listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        result = validateCreateUserSession('');
        
        assert.strictEqual(typeof result, 'object');
        ({ status, message } = result);
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        listOfMessages = message.split('\n');
        for (let msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateCreateUserSession(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(message.length === 0);
        
        done();
    });
});