const { suite: testSuite, test } = require('mocha');
const { strict: assert } = require('assert');
const uuid = require('uuid');
const mongoose = require('mongoose');

const { validateFetchUserSession, validateUpdateUserProfile, validateSaveUserProfile } = require('../../src/validations/user');
const { sampleUserData1 } = require('../../utils/constants');
const { log } = require('../../utils/logging');


testSuite('VALIDATION: validateFetchUserSession(data: object): object', function () {
    const data = {
        email: sampleUserData1.userEmail,
        password: sampleUserData1.userPassword
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateFetchUserSession();
        
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
        let result = validateFetchUserSession(null);
        
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
        
        result = validateFetchUserSession('');
        
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
        const result = validateFetchUserSession({});
        
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
        const result = validateFetchUserSession({
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
        const result = validateFetchUserSession({
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
        const result = validateFetchUserSession({
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
        const result = validateFetchUserSession({
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
        const result = validateFetchUserSession(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(message.length === 0);
        
        done();
    });
});

testSuite('VALIDATION: validateUpdateUserProfile(data: object): object', function () {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        ...sampleUserData1
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateUpdateUserProfile();
        
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
        let result = validateUpdateUserProfile(null);
        
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
        
        result = validateUpdateUserProfile('');
        
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
        const result = validateUpdateUserProfile({});
        
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
        const result = validateUpdateUserProfile({
            ...data,
            _id: undefined
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
        const result = validateUpdateUserProfile({
            ...data,
            _id: uuid.v1()
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'User Id is invalid.');
        
        done();
    });
    test('should not return errorMessage if email is missing', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            userEmail: undefined
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
    test('should return errorMessage if email is incorrect', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            userEmail: 'something@.anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        
        const { status, message } = result;
              
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Email is invalid.');

        done();
    });
    test('should not return errorMessage if password is missing', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            userPassword: undefined
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
    test('should return errorMessage if password is incorrect', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            userPassword: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Password is invalid.');
        
        done();
    });
    test('should not return errorMessage if userName is missing', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            userName: undefined
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
    test('should return errorMessage if userName is incorrect', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            userName: 11
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Name is invalid.');
        
        done();
    });
    test('should not return errorMessage if expectedPerDayIntakeCalorie is missing', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            expectedPerDayIntakeCalorie: undefined
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
    test('should return errorMessage if expectedPerDayIntakeCalorie is incorrect', function (done) {
        const result = validateUpdateUserProfile({
            ...data,
            expectedPerDayIntakeCalorie: 'any'
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'expectedPerDayIntakeCalorie is invalid.');
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateUpdateUserProfile(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
});

testSuite('VALIDATION: validateSaveUserProfile(data: object): object', function () {
    const data = {
        ...sampleUserData1,
        expectedPerDayIntakeCalorie: undefined,
        isActive: undefined
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateSaveUserProfile();
        
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
        let result = validateSaveUserProfile(null);
        
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
        
        result = validateSaveUserProfile('');
        
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
        const result = validateSaveUserProfile({});
        
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
        const result = validateSaveUserProfile({
            ...data,
            userEmail: undefined
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
        const result = validateSaveUserProfile({
            ...data,
            userEmail: 'something@.anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        
        const { status, message } = result;
              
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Email is invalid.');

        done();
    });
    test('should return errorMessage if password is missing', function (done) {
        const result = validateSaveUserProfile({
            ...data,
            userPassword: undefined
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
        const result = validateSaveUserProfile({
            ...data,
            userPassword: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Password is invalid.');
        
        done();
    });
    test('should return errorMessage if userName is missing', function (done) {
        const result = validateSaveUserProfile({
            ...data,
            userName: undefined
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
    test('should return errorMessage if userName is incorrect', function (done) {
        const result = validateSaveUserProfile({
            ...data,
            userName: 11
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Name is invalid.');
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateSaveUserProfile(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
});