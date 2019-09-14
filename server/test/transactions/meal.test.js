const { suite: testSuite, test, after, beforeEach, afterEach, before } = require('mocha');
const { strict: assert } = require('assert');
const mongoose = require('mongoose');
const uuid = require('uuid');

const { sampleMeal1 } = require('../../utils/constants');
const { saveMealTransaction, removeMeals, updateMealTransaction, deleteMealTransaction, fetchMealTransaction } = require('../../src/transactions/meal.transactions');

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
    after(async () => {
        await removeMeals();
    });
});

testSuite('Transaction: updateMealTransaction(data: object, userId: string): Promise<any>', function () {
    const data = {
        ...sampleMeal1,
    };
    const sampleMongoId = new mongoose.Types.ObjectId();
    let mealId = undefined;
    
    data.mealName = `updated${data.mealName}`;
    data.mealDate = '3333/03/30';
    data.mealCalories = 40;
    
    beforeEach(async () => {
        ({ _id: mealId } = await saveMealTransaction(sampleMeal1, sampleMongoId));

        data._id = mealId;
    });
    test('should return null if data & userId is missing', async function () {
        const result = await updateMealTransaction();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is missing', async function () {
        const result = await updateMealTransaction(undefined, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data & userId is null', async function () {
        const result = await updateMealTransaction(null, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await updateMealTransaction(null, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11.11, 11, 11n, true];
        let result = undefined;

        for (const ele of listOfData) {
            result = await updateMealTransaction(ele, sampleMongoId);
        
            assert.strictEqual(typeof result, 'object');
            assert.strictEqual(result, null);
        }

        Promise.resolve(1);
    });
    test('should return null if userId is primitive', async function () {
        let result = await updateMealTransaction(data, '');
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await updateMealTransaction(data, 11.11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        result = await updateMealTransaction(data, 11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await updateMealTransaction(data, 11n);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await updateMealTransaction(data, true);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if userId is missing', async function () {
        const result = await updateMealTransaction(data);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if userId is improper', async function () {
        const result = await updateMealTransaction(data, uuid.v1());
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return null if userId is null', async function () {
        const result = await updateMealTransaction(data, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if meal calories is incorrect', async function () {
        const result = await updateMealTransaction({
            ...data,
            mealCalories: 'anything',
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return null if mealId is missing', async function () {
        const result = await updateMealTransaction({
            ...data,
            _id: undefined
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if mealId is improper', async function () {
        const result = await updateMealTransaction({
            ...data,
            _id: uuid.v1()
        }, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return saved meal if data is correct', async function () {
        const result = await updateMealTransaction(data, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        
        for (const key in result) {
            if (key !== 'user') {
                assert.strictEqual(result[key].toString(), data[key]? data[key].toString() : '0');
            } else {
                assert.strictEqual(result[key].toString(), sampleMongoId.toString());
            }
        }

        Promise.resolve(1);
    });
    test('should return wrong data if meal name is missing', async function () {
        const result = await updateMealTransaction({
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
        assert.strictEqual(mealName, null);
        assert.strictEqual(mealCalories, data.mealCalories);
        assert.strictEqual(mealDate, data.mealDate);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal name is incorrect', async function () {
        const result = await updateMealTransaction({
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
        const result = await updateMealTransaction({
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
        assert.strictEqual(mealCalories, null);
        assert.strictEqual(mealDate, data.mealDate);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal date is missing', async function () {
        const result = await updateMealTransaction({
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
        assert.strictEqual(mealDate, null);
        
        Promise.resolve(1);
    });
    test('should return wrong data if meal date is incorrect', async function () {
        const result = await updateMealTransaction({
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
    afterEach(async () => {
        await deleteMealTransaction(mealId, sampleMongoId);
    });
});

testSuite('Transaction: deleteMealTransaction(data: string, userId: string): Promise<any>', function () {
    let data = undefined;
    const sampleMongoId = new mongoose.Types.ObjectId();
    
    beforeEach(async () => {
        ({ _id: data } = await saveMealTransaction(sampleMeal1, sampleMongoId));

    });
    test('should return null if data & userId is missing', async function () {
        const result = await deleteMealTransaction();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is missing', async function () {
        const result = await deleteMealTransaction(undefined, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data & userId is null', async function () {
        const result = await deleteMealTransaction(null, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await deleteMealTransaction(null, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11.11, 11, 11n, true];
        let result = undefined;

        for (const ele of listOfData) {
            result = await deleteMealTransaction(ele, sampleMongoId);
        
            assert.strictEqual(typeof result, 'object');
            assert.strictEqual(result, null);
        }

        Promise.resolve(1);
    });
    test('should return null if userId is primitive', async function () {
        let result = await deleteMealTransaction(data, '');
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await deleteMealTransaction(data, 11.11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        result = await deleteMealTransaction(data, 11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await deleteMealTransaction(data, 11n);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await deleteMealTransaction(data, true);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if userId is missing', async function () {
        const result = await deleteMealTransaction(data);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if userId is improper', async function () {
        const result = await deleteMealTransaction(data, uuid.v1());
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return null if userId is null', async function () {
        const result = await deleteMealTransaction(data, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return 1 if data and userId is correct', async function () {
        const result = await deleteMealTransaction(data, sampleMongoId);
        
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 1);

        Promise.resolve(1);
    });
});

testSuite('Transaction: fetchMealTransaction(data: object, userId: string): Promise<any>', function () {
    let data = {
        min: sampleMeal1.mealDate,
        max: sampleMeal1.mealDate
    };
    const sampleMongoId = new mongoose.Types.ObjectId();
    
    before(async () => {
        ({ _id: data } = await saveMealTransaction(sampleMeal1, sampleMongoId));
    });
    test('should return null if data & userId is missing', async function () {
        const result = await fetchMealTransaction();
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is missing', async function () {
        const result = await fetchMealTransaction(undefined, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data & userId is null', async function () {
        const result = await fetchMealTransaction(null, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return null if data is null', async function () {
        const result = await fetchMealTransaction(null, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return blank array if data is blank-object|primitives', async function () {
        const listOfData = [{}, '', 11.11, 11, 11n, true];
        let result = undefined;

        for (const ele of listOfData) {
            result = await fetchMealTransaction(ele, sampleMongoId);
        
            assert.strictEqual(typeof result, 'object');
            assert.ok(Array.isArray(result));
            assert.ok(!result.length);
        }

        Promise.resolve(1);
    });
    test('should return null if userId is primitive', async function () {
        let result = await fetchMealTransaction(data, '');
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await fetchMealTransaction(data, 11.11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        result = await fetchMealTransaction(data, 11);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await fetchMealTransaction(data, 11n);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        result = await fetchMealTransaction(data, true);
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);

        Promise.resolve(1);
    });
    test('should return blank array if userId is missing', async function () {
        const result = await fetchMealTransaction(data);
        
        assert.strictEqual(typeof result, 'object');
        assert.ok(Array.isArray(result));
        assert.ok(!result.length);

        Promise.resolve(1);
    });
    test('should return null if userId is improper', async function () {
        const result = await fetchMealTransaction(data, uuid.v1());
        
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result, null);
        
        Promise.resolve(1);
    });
    test('should return blank array if userId is null', async function () {
        const result = await fetchMealTransaction(data, null);
        
        assert.strictEqual(typeof result, 'object');
        assert.ok(Array.isArray(result));
        assert.ok(!result.length);

        Promise.resolve(1);
    });
    test('should return list of meals if data and userId is correct', async function () {
        const result = await fetchMealTransaction(data, sampleMongoId);
        
        assert.strictEqual(typeof result, 'object');
        assert.ok(Array.isArray(result));

        for (const iterator of result) {
            for (const key in iterator) {
                if (Object.hasOwnProperty.call(iterator, key)) {
                    if (key !== 'user') {
                        assert.strictEqual(iterator[key].toString(), data[key]? data[key].toString() : '0');
                    } else {
                        assert.strictEqual(iterator[key].toString(), sampleMongoId.toString());
                    }
                    
                }
            }
        }

        Promise.resolve(1);
    });
});