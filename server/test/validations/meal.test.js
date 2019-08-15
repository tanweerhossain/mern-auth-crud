const { suite: testSuite, test } = require('mocha');
const { strict: assert } = require('assert');
const uuid = require('uuid');
const mongoose = require('mongoose');

const { sampleMeal1 } = require('../../utils/constants');
const { validateAddMeal, validateUpdateMeal, validateDeleteMeal, validateFetchMeal } = require('../../src/validations/meal');


testSuite('VALIDATION: validateAddMeal(data: object): object', function () {
    const data = {
        ...sampleMeal1
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateAddMeal();
        
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
        let result = validateAddMeal(null);
        
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
        
        result = validateAddMeal('');
        
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
        const result = validateAddMeal({});
        
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
    test('should return errorMessage if meal name is missing', function (done) {
        const result = validateAddMeal({
            ...data,
            mealName: undefined
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
    test('should return errorMessage if meal name is incorrect', function (done) {
        const result = validateAddMeal({
            ...data,
            mealName: 11
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
            assert.strictEqual(msg, 'Meal Name is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if meal calories is missing', function (done) {
        const result = validateAddMeal({
            ...data,
            mealCalories: undefined
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
    test('should return errorMessage if meal calories is incorrect', function (done) {
        const result = validateAddMeal({
            ...data,
            mealCalories: 'anything'
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
            assert.strictEqual(msg, 'Meal Calories is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if meal date is missing', function (done) {
        const result = validateAddMeal({
            ...data,
            mealDate: undefined
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
    test('should return errorMessage if meal date is incorrect', function (done) {
        const result = validateAddMeal({
            ...data,
            mealDate: '111/33/11'
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
            assert.strictEqual(msg, 'Meal Date is invalid.');
        }
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateAddMeal(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(!message.length);
        
        done();
    });
});

testSuite('VALIDATION: validateUpdateMeal(data: object): object', function () {
    const data = {
        _id: new mongoose.Types.ObjectId(),
        ...sampleMeal1
    };
    
    test('should return errorMessage if data is missing', function (done) {
        const result = validateUpdateMeal();
        
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
        let result = validateUpdateMeal(null);
        
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
        
        result = validateUpdateMeal('');
        
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
        const result = validateUpdateMeal({});
        
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
        const result = validateUpdateMeal({
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
        const result = validateUpdateMeal({
            ...data,
            _id: uuid.v1()
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
            assert.strictEqual(msg, 'Meal Id is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if meal name is missing', function (done) {
        const result = validateUpdateMeal({
            ...data,
            mealName: undefined
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
    test('should return errorMessage if meal name is incorrect', function (done) {
        const result = validateUpdateMeal({
            ...data,
            mealName: 11
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
            assert.strictEqual(msg, 'Meal Name is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if meal calories is missing', function (done) {
        const result = validateUpdateMeal({
            ...data,
            mealCalories: undefined
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
    test('should return errorMessage if meal calories is incorrect', function (done) {
        const result = validateUpdateMeal({
            ...data,
            mealCalories: 'anything'
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
            assert.strictEqual(msg, 'Meal Calories is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if meal date is missing', function (done) {
        const result = validateUpdateMeal({
            ...data,
            mealDate: undefined
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
    test('should return errorMessage if meal date is incorrect', function (done) {
        const result = validateUpdateMeal({
            ...data,
            mealDate: '111/33/11'
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
            assert.strictEqual(msg, 'Meal Date is invalid.');
        }
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateUpdateMeal(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
});

testSuite('VALIDATION: validateDeleteMeal(data: string): object', function () {
    const data = new mongoose.Types.ObjectId();

    test('should return errorMessage if data is missing', function (done) {
        const result = validateDeleteMeal();
        
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
    test('should return errorMessage if data is incorrect', function (done) {
        const result = validateDeleteMeal(uuid.v1());
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        const listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.strictEqual(msg, 'Meal Id is invalid.');
        }
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateDeleteMeal(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
});

testSuite('VALIDATION: validateFetchMeal(data: object): object', function () {
    const data = {
        min: sampleMeal1.mealDate,
        max: sampleMeal1.mealDate
    };

    test('should return errorMessage if data is missing', function (done) {
        const result = validateFetchMeal();
        
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
    test('should return errorMessage if data is incorrect', function (done) {
        let result = validateFetchMeal(null);
        
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
        
        result = validateFetchMeal('');
        
        assert.strictEqual(typeof result, 'object');
        ({ status, message } = result);
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.ok(message.length > 0);

        listOfMessages = message.split('\n');
        for (const msg of listOfMessages) {
            assert.strictEqual(typeof msg, 'string');
            assert.ok(msg.length > 0);
        }
        
        done();
    });
    test('should return errorMessage if minimum range is missing', function (done) {
        const result = validateFetchMeal({
            ...data,
            min: undefined
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
    test('should return errorMessage if minimum range is incorrect', function (done) {
        const result = validateFetchMeal({
            ...data,
            min: '11-11-11'
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
            assert.strictEqual(msg, 'Meal Date Min Range is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if maximum range is missing', function (done) {
        const result = validateFetchMeal({
            ...data,
            max: undefined
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
    test('should return errorMessage if maximum range is incorrect', function (done) {
        const result = validateFetchMeal({
            ...data,
            max: '11-11-11'
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
            assert.strictEqual(msg, 'Meal Date Max Range is invalid.');
        }
        
        done();
    });
    test('should return errorMessage if meal date range is incorrect', function (done) {
        const result = validateFetchMeal({
            min: '2222/12/22',
            max: '1111/11/11'
        });
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(status);
        assert.strictEqual(typeof message, 'string');
        assert.strictEqual(message, 'Meal Date Range is invalid.');
        
        done();
    });
    test('should not return errorMessage if data is correct', function (done) {
        const result = validateFetchMeal(data);
        
        assert.strictEqual(typeof result, 'object');
        const { status, message } = result;
        
        assert.strictEqual(typeof status, 'boolean');
        assert.ok(!status);
        assert.ok(Array.isArray(message));
        assert.ok(!message.length);
        
        done();
    });
});