const { suite: testSuite, test } = require('mocha');
const { strict: assert } = require('assert');
const mongoose = require('mongoose');
const uuid = require('uuid');

const { sampleMeal1 } = require('../../utils/constants');
const { saveMealTransaction } = require('../../src/transactions/meal.transactions');

testSuite('Transaction: saveMealTransaction(data: object, userId: string): Promise<any>', function () {
    const data = {
        ...sampleMeal1,
    };
    const sampleMongoId = new mongoose.Types.ObjectId();
    
    test('should return null if data & userId is missing', async function () {
        const result = await saveMealTransaction();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is missing', async function () {
        const result = await saveMealTransaction(undefined, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data & userId is null', async function () {
        const result = await saveMealTransaction(null, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await saveMealTransaction(null, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if userId is primitive', async function () {
        let result = await saveMealTransaction(data, '');
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await saveMealTransaction(data, 11.11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        result = await saveMealTransaction(data, 11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await saveMealTransaction(data, 11n);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await saveMealTransaction(data, true);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if userId is improper', async function () {
        const result = await saveMealTransaction(data, uuid.v1());
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return null if meal calories is incorrect', async function () {
        const result = await saveMealTransaction({
            ...data,
            mealCalories: 'anything',
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return saved meal if data is correct', async function () {
        const result = await saveMealTransaction(data, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');

        Promise.resolve(1);
    });
    test('should return wrong data if userId is missing', async function () {
        const result = await saveMealTransaction(data);
        
        assert.strictEqual(typeof result, 'object');
        
        const {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user, undefined);
        assert.strictEqual(mealName, data.mealName);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.strictEqual(mealDate, data.mealDate);

        Promise.resolve(1);
    });
    test('should return wrong data if userId is null', async function () {
        const result = await saveMealTransaction(data, null);
        
        assert.strictEqual(typeof result, 'object');
        
        const {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user, null);
        assert.strictEqual(mealName, data.mealName);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.strictEqual(mealDate, data.mealDate);

        Promise.resolve(1);
    });
    test('should return wrong data if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11.11, 11, 11n, true];
        let result = undefined;

        listOfData.forEach(async ele => {
            result = await saveMealTransaction(ele, sampleMongoId);
        
            assert.strictEqual(typeof result, 'object');

            let {
                _id,
                user,
                mealName,
                mealDate,
                mealCalories,
            } = result;

            assert.ok(mongoose.isValidObjectId(_id));
            assert.strictEqual(user.toString(), sampleMongoId.toString());
            assert.strictEqual(mealName, undefined);
            assert.strictEqual(mealCalories, 0);
            assert.strictEqual(mealDate, undefined);
        });

        Promise.resolve(1);
    });
    test('should return wrong data if meal name is missing', async function () {
        const result = await saveMealTransaction({
            ...data,
            mealName: undefined,
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        
        let {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user.toString(), sampleMongoId.toString());
        assert.strictEqual(mealName, undefined);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.strictEqual(mealDate, data.mealDate);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal name is incorrect', async function () {
        const result = await saveMealTransaction({
            ...data,
            mealName: 11,
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        
        let {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user.toString(), sampleMongoId.toString());
        assert.ok(mealName == 11);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.strictEqual(mealDate, data.mealDate);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal calories is missing', async function () {
        const result = await saveMealTransaction({
            ...data,
            mealCalories: undefined,
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        
        let {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user.toString(), sampleMongoId.toString());
        assert.strictEqual(mealName, data.mealName);
        assert.strictEqual(mealCalories, 0);
        assert.strictEqual(mealDate, data.mealDate);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal date is missing', async function () {
        const result = await saveMealTransaction({
            ...data,
            mealDate: undefined,
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        
        let {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user.toString(), sampleMongoId.toString());
        assert.strictEqual(mealName, data.mealName);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.strictEqual(mealDate, undefined);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal date is incorrect', async function () {
        const result = await saveMealTransaction({
            ...data,
            mealDate: 11,
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        
        let {
            _id,
            user,
            mealName,
            mealDate,
            mealCalories,
        } = result;

        assert.ok(mongoose.isValidObjectId(_id));
        assert.strictEqual(user.toString(), sampleMongoId.toString());
        assert.strictEqual(mealName, data.mealName);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.ok(mealDate == 11);
        
        Promise.resolve(1);
    });
});