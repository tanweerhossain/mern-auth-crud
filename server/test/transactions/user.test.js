const { suite: testSuite, test, before, afterEach } = require('mocha');
const { strict: assert } = require('assert');
const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

const { log } = require('../../utils/logging');
const { fetchAllUsersTransaction, fetchUserSessionTransaction, fetchUserByEmailTransaction, fetchUserProfileTransaction, updateUserProfileTransaction, saveUserProfileTransaction, removeUserByEmailId, removeUserById, toggleUserActiveTransaction, createUserSessionTransaction } = require('../../src/transactions/user.transactions');
const { sampleUserData1, sampleUserData4, sampleUserData3 } = require('../../utils/constants');
const { getNodeCache } = require('../../src/middlewares/cachingModule');


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

testSuite('Transaction: fetchUserSessionTransaction(data: object): Promise<any>', function () {
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

testSuite('Transaction: fetchUserProfileTransaction(user: string): Promise<any>', function () {
    let data = undefined;

    before(async () => {
        ({ _id: data } = await fetchUserByEmailTransaction(sampleUserData1.userEmail));
    });
    test('should return null if user id is missing', async function () {
        const result = await fetchUserProfileTransaction();
        
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if user id is null', async function () {
        const result = await fetchUserProfileTransaction(null);
        
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if user id is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11, 11n, 11.11, false];

        for (const iterator of listOfData) {
            const result = await fetchUserProfileTransaction(iterator);

            assert.strictEqual(result, null);
        }

        Promise.resolve(1);
    });
    test('should return null if user id are incorrect', async function () {
        const result = await fetchUserProfileTransaction(uuid.v1());

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return user details if user id are correct', async function () {
        const result = await fetchUserProfileTransaction(data);

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.ok(userName.length);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(userEmail.length);
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');

        Promise.resolve(1);
    });
});

testSuite('Transaction: updateUserProfileTransaction(userData: string): Promise<any>', function () {
    const data = {
        ...sampleUserData4,
        userEmail: `updated${sampleUserData4.userEmail}`,
        userName: `updated${sampleUserData4.userName}`,
        expectedPerDayIntakeCalorie: 100,
        userPassword: `updated${sampleUserData4.userPassword}`
    };
    let sampleUserPassword = undefined;

    before(async () => {
        await removeUserByEmailId(sampleUserData4.userEmail);
    });
    beforeEach(async () => {
        if (data._id) {
            await removeUserById(data._id);
        }
        ({ _id: data._id, userPassword: sampleUserPassword } = await saveUserProfileTransaction(sampleUserData4));

        // await updateUserProfileTransaction({
        //     ...sampleUserData4,
        //     _id: data._id
        // });
    });
    test('should return null if data is missing', async function () {
        const result = await updateUserProfileTransaction();
        
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await updateUserProfileTransaction(null);
        
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11, 11n, 11.11, false];

        for (const iterator of listOfData) {
            const result = await updateUserProfileTransaction(iterator);

            assert.strictEqual(result, null);
        }

        Promise.resolve(1);
    });
    test('should return null if data are incorrect', async function () {
        const result = await updateUserProfileTransaction(uuid.v1());

        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return old user details if only user id is present', async function () {
        const result = await updateUserProfileTransaction({
            _id: data._id
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, sampleUserData4.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, sampleUserData4.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, sampleUserData4.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, sampleUserData4.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return updated user details if email is missing', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            userEmail: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, sampleUserData4.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return updated user details if email is improper string value', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            userEmail: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(!validator.isEmail(userEmail));
        assert.strictEqual(userEmail, 'anything');
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return updated user details if email is improper non-string value', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            userEmail: 11
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(!validator.isEmail(userEmail));
        assert.strictEqual(userEmail, '11');
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return updated user details if user name is missing', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            userName: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, sampleUserData4.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return null if user name is improper', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            userName: 11
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, '11');
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return updated user details if password is missing', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
           userPassword: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        const { userPassword } = await fetchUserByEmailTransaction(userEmail);
        
        assert.strictEqual(sampleUserPassword, userPassword);

        Promise.resolve(1);
    });
    test('should return updated user details if password is improper string value', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
           userPassword: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);
        
        const { userPassword } = await fetchUserByEmailTransaction(userEmail);
        
        assert.strictEqual('anything', userPassword);

        Promise.resolve(1);
    });
    test('should return updated user details if password is improper non-string value', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
           userPassword: 11
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);
        
        const { userPassword } = await fetchUserByEmailTransaction(userEmail);
        
        assert.strictEqual('11', userPassword);

        Promise.resolve(1);
    });
    test('should return updated user details if expectedPerDayIntakeCalorie is missing', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            expectedPerDayIntakeCalorie: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, sampleUserData4.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return null if expectedPerDayIntakeCalorie is improper value', async function () {
        const result = await updateUserProfileTransaction({
            ...data,
            expectedPerDayIntakeCalorie: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return user details if data are correct', async function () {
        const result = await updateUserProfileTransaction(data);

        assert.strictEqual(typeof result, 'object');        

        const { _id, userName, userEmail, isActive, expectedPerDayIntakeCalorie } = result;

        assert.strictEqual(_id.toString(), data._id.toString());
        assert.strictEqual(typeof userName, 'string');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(typeof userEmail, 'string');
        assert.ok(validator.isEmail(userEmail));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(typeof isActive, 'boolean');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(typeof expectedPerDayIntakeCalorie, 'number');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
});

testSuite('Transaction: saveUserProfileTransaction(userData: object): Promise<any>', function () {
    const data = {
        ...sampleUserData4
    };

    before(async () => {
        const { _id } = await fetchUserByEmailTransaction(sampleUserData1.userEmail);

        if (mongoose.isValidObjectId(_id)) {
            await updateUserProfileTransaction({
                _id,
                userEmail: `updated${sampleUserData4.userEmail}`
            });
        }
    });
    test('should return wrong data if data is missing', async function () {
        const result = await saveUserProfileTransaction();
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, undefined);
        assert.strictEqual(userName, undefined);
        assert.strictEqual(isActive, false);
        assert.strictEqual(userPassword, '');
        assert.strictEqual(expectedPerDayIntakeCalorie, 0);

        Promise.resolve(1);
    });
    test('should return wrong data if data is null', async function () {
        const result = await saveUserProfileTransaction(null);
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, undefined);
        assert.strictEqual(userName, undefined);
        assert.strictEqual(isActive, false);
        assert.strictEqual(userPassword, '');
        assert.strictEqual(expectedPerDayIntakeCalorie, 0);

        Promise.resolve(1);
    });
    test('should return wrong data if data is blank-object', async function () {
        const result = await saveUserProfileTransaction({});
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, undefined);
        assert.strictEqual(userName, undefined);
        assert.strictEqual(isActive, false);
        assert.strictEqual(userPassword, '');
        assert.strictEqual(expectedPerDayIntakeCalorie, 0);

        Promise.resolve(1);
    });
    test('should return null if data is primitives', async function () {
        const listOfData = [11, 11n, 11.11, false, ''];

        for (const iterator of listOfData) {
            const result = await saveUserProfileTransaction(iterator);

            assert.strictEqual(result, null);
        }

        Promise.resolve(1);
    });
    test('should return wrong data if email is missing', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            userEmail: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, undefined);
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return saved user data if email is improper', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            userEmail: 11
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, '11');
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return wrong user data if user name is missing', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            userName: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, undefined);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return saved user data if user name is improper', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            userName: 11
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, '11');
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return saved user data if user password is missing', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            userPassword: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, '');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return saved user data if user password is improper', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            userPassword: true
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, 'true');
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return saved user data if isActive is missing', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            isActive: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, false);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    test('should return null if isActive is improper', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            isActive: 88
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        Promise.resolve(1);
    });
    test('should return saved user data if expectedPerDayIntakeCalorie is missing', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            expectedPerDayIntakeCalorie: undefined
        });
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, 0);

        Promise.resolve(1);
    });
    test('should return null if expectedPerDayIntakeCalorie is improper', async function () {
        const result = await saveUserProfileTransaction({
            ...data,
            expectedPerDayIntakeCalorie: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return saved user data if data is correct', async function () {
        const result = await saveUserProfileTransaction(data);
        
        assert.strictEqual(typeof result, 'object');

        const { _id, userEmail, userName, userPassword, isActive, expectedPerDayIntakeCalorie } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(userEmail, data.userEmail);
        assert.strictEqual(userName, data.userName);
        assert.strictEqual(isActive, data.isActive);
        assert.strictEqual(userPassword, data.userPassword);
        assert.strictEqual(expectedPerDayIntakeCalorie, data.expectedPerDayIntakeCalorie);

        Promise.resolve(1);
    });
    afterEach(async () => {
        await removeUserByEmailId(sampleUserData4.userEmail);
        await removeUserByEmailId(null);
        await removeUserByEmailId(undefined);
    });
});

testSuite('Transaction: toggleUserActiveTransaction(userData: object): Promise<any>', function () {
    const data = {
        isActive: true
    };

    before(async () => {
        await removeUserById(null);
        await removeUserByEmailId(null);
        await removeUserById(undefined);
        await removeUserByEmailId(undefined);

        ({ _id: data._id } = await saveUserProfileTransaction(sampleUserData3));
    });
    test('should return null if data is missing', async function () {
        const result = await toggleUserActiveTransaction();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await toggleUserActiveTransaction(null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return 1 if data is blank-object', async function () {
        const result = await toggleUserActiveTransaction({});
        
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 1);

        Promise.resolve(1);
    });
    test('should return 1 if data is primitives', async function () {
        const listOfData = [11, 11n, 11.11, false, ''];

        for (const iterator of listOfData) {
            const result = await toggleUserActiveTransaction(iterator);

            assert.strictEqual(result, 1);
        }

        Promise.resolve(1);
    });
    test('should return 1 if isActive is missing', async function () {
        const result = await toggleUserActiveTransaction({
            ...data,
            isActive: undefined
        });
        
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 1);

        Promise.resolve(1);
    });
    test('should return null if isActive is improper', async function () {
        const result = await toggleUserActiveTransaction({
            ...data,
            isActive: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return 1 if user id is missing', async function () {
        const result = await toggleUserActiveTransaction({
            ...data,
            _id: undefined
        });
        
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 1);

        Promise.resolve(1);
    });
    test('should return null if user id is improper', async function () {
        const result = await toggleUserActiveTransaction({
            ...data,
            _id: 'anything'
        });
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return 1 if data is correct', async function () {
        const result = await toggleUserActiveTransaction(data);
        
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 1);

        Promise.resolve(1);
    });
});

testSuite('Transaction: createUserSessionTransaction(userId: string): Promise<string | null>', function () {
    let data = undefined;

    before(async () => {
        ({ _id: data } = await fetchUserByEmailTransaction(sampleUserData1.userEmail));
    });
    test('should return null if data is missing', async function () {
        const result = await createUserSessionTransaction();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await createUserSessionTransaction(null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should throw error if data is improper', async function () {
        try {
            await createUserSessionTransaction(uuid.v1());
        } catch (error) {
            assert.ok(error.message);
            
            Promise.resolve(1);
            return;
        }
        
        assert.ok(false);
    });
    test('should return null if data is incorrect', async function () {
        const result = await createUserSessionTransaction(new mongoose.Types.ObjectId());
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should throw error if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11, 11n, 11.11, false];
        let errorFlag = false;

        for (const iterator of listOfData) {
            try {
                await createUserSessionTransaction(iterator);
                errorFlag = true;
            } catch (error) {
                assert.ok(error.message);  
            }
        }

        if (errorFlag) assert.ok(false);
        else Promise.resolve(1);
    });
    test('should return sessionid if data is incorrect', async function () {
        const result = await createUserSessionTransaction(data);
        
        assert.strictEqual(typeof result, 'string');
        assert.strictEqual(getNodeCache(result).toString(), data.toString());

        Promise.resolve(1);
    });
});
