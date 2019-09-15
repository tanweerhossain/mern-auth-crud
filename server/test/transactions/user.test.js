const { suite: testSuite, test, before } = require('mocha');
const { strict: assert } = require('assert');
const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

const { log } = require('../../utils/logging');
const { fetchAllUsersTransaction, fetchUserSessionTransaction, fetchUserByEmailTransaction } = require('../../src/transactions/user.transactions');
const { sampleUserData1 } = require('../../utils/constants');
const { getNodeCache } = require('../../src/middlewares/cachingModule');
const get = require('../config.json');


testSuite('Transaction: fetchAllUsersTransaction(data: object): Promise<any>', function () {

    test('should return data if called, with or without parameter', async function () {
        const result = await fetchAllUsersTransaction();

        assert.strictEqual(typeof result, 'object');
        assert.ok(Array.isArray(result));

        for (const iterator of result) {
            const { userName, userEmail, isActive, expectedPerDayIntakeCalorie } = iterator;

            assert.strictEqual(typeof userEmail, 'string');
            assert.ok(validator.isEmail(userEmail));
            assert.strictEqual(typeof userName, 'string');
            assert.ok(userName.length);
            assert.strictEqual(typeof isActive, 'boolean');
            assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        }

        Promise.resolve(1);
    });
});

testSuite('Transaction: fetchUserSessionTransaction(): Promise<any>', function () {
    const data = {
        email: sampleUserData1.userEmail,
        password: sampleUserData1.userPassword
    };
    let sampleUserId = undefined;

    before(async () => {
        ({ _id: sampleUserId } = await fetchUserByEmailTransaction(data.email));
    });
    test('should throw error if data is missing', async function () {
        try {
            await fetchUserSessionTransaction();
        } catch (error) {
            assert.ok(error.message);

            Promise.resolve(1);
            return;
        }

        assert.ok(false);
    });
    test('should throw error if data is null', async function () {
        try {
            await fetchUserSessionTransaction(null);
        } catch (error) {
            assert.ok(error.message);

            Promise.resolve(1);
            return;
        }

        assert.ok(false);
    });
    test('should return null if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11, 11n, 11.11, false];

        for (const iterator of listOfData) {
            const result = await fetchUserSessionTransaction(iterator);

            assert.strictEqual(result, null);
        }

        Promise.resolve(1);
    });
    test('should return null if email is missing', async function () {
        const result = await fetchUserSessionTransaction({
            ...data,
            email: undefined
        });

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if email is improper', async function () {
        const result = await fetchUserSessionTransaction({
            ...data,
            email: 'something@anything'
        });

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if password is missing', async function () {
        const result = await fetchUserSessionTransaction({
            ...data,
            password: undefined
        });

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if password is improper', async function () {
        const result = await fetchUserSessionTransaction({
            ...data,
            password: 'something'
        });

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if credentials are incorrect', async function () {
        const result = await fetchUserSessionTransaction({
            ...data,
            password: data.password + '0'
        });

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return sessionid if credentials are correct', async function () {
        const result = await fetchUserSessionTransaction(data);

        assert.strictEqual(getNodeCache(result).toString(), sampleUserId.toString());

        Promise.resolve(1);
    });
});