const { suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');
const { isValidObjectId } = require('mongoose');
const moment = require('moment');

const { CreateSession } = require('../utils/CreateSession');
const { sampleUserData1, sampleMeal1, sampleUserData2 } = require('../../utils/constants');
const server = require('../../bin/www');
const { log } = require('../../utils/logging');
const { fetchUserByEmailTransaction } = require('../../src/transactions/user.transactions');
const { saveMealTransaction, fetchMealTransaction } = require('../../src/transactions/meal.transactions');

testSuite('API: POST /ajax/meal/save [ addMeal ]', function () {
    const endpoint = '/ajax/meal/save';
    let userSessionId = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
    });
    test('should return 401 response while sessionid is missing', function(done) {
        chai.request(server)
            .post(endpoint)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 401 response while sessionid is incorrect', function(done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', uuid.v1())
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 400 response while body is missing with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealName is missing with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .send({
                // mealName: sampleMeal1.mealName,
                mealDate: sampleMeal1.mealDate,
                mealCalories: sampleMeal1.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealName is incorrect with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .send({
                mealName: true,
                mealDate: sampleMeal1.mealDate,
                mealCalories: sampleMeal1.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealDate is missing with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .send({
                mealName: sampleMeal1.mealName,
                // mealDate: sampleMeal1.mealDate,
                mealCalories: sampleMeal1.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealDate is invalid with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .send({
                mealName: sampleMeal1.mealName,
                mealDate: '111/1/1',
                mealCalories: sampleMeal1.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealCalories is missing with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .send({
                mealName: sampleMeal1.mealName,
                mealDate: sampleMeal1.mealDate,
                // mealCalories: sampleMeal1.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealCalories is incorrect with correct sessionid', function (done) {
        chai.request(server)
            .post(endpoint)
            .set('sessionid', userSessionId)
            .send({
                mealName: sampleMeal1.mealName,
                mealDate: sampleMeal1.mealDate,
                mealCalories: 'something',
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 200 response while corrent body and sessionid', function (done) {
        chai.request(server)
        .post(endpoint)
        .set('sessionid', userSessionId)
        .send({
            mealName: sampleMeal1.mealName,
            mealDate: sampleMeal1.mealDate,
            mealCalories: sampleMeal1.mealCalories,
        })
        .end((err, res) => {
            chai.expect(res.ok).to.be.true;
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.be.a('object');

            const { success, body } = res.body;
      
            chai.expect(success).to.be.a('boolean');
            chai.expect(success).to.be.true;
            chai.expect(body).to.be.a('object');
            
            const {
                mealName,
                mealDate,
                mealCalories,
                _id
            } = body;

            chai.expect(mealName).to.be.a('string');
            chai.expect(mealName).to.be.equal(sampleMeal1.mealName);
            chai.expect(mealDate).to.be.a('string');
            chai.expect(moment(mealDate, 'YYYY/MM/DD', true).isValid()).to.be.true;
            chai.expect(mealDate).to.be.equal(sampleMeal1.mealDate);
            chai.expect(mealCalories).to.be.a('number');
            chai.expect(mealCalories).to.be.equal(sampleMeal1.mealCalories);
            chai.expect(isValidObjectId(_id)).to.be.true;          

            done();
        });
});
});

testSuite('API: PUT /ajax/meal/update [ updateMeal ]', function() {
    const endpoint = '/ajax/meal/update';
    let sampleMealData = undefined;
    let userSessionId = undefined;
    let userSessionId2 = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
        userSessionId2 = await CreateSession.create('USER', sampleUserData2.userEmail, sampleUserData2.userPassword);
        const { _id } = await fetchUserByEmailTransaction(sampleUserData1.userEmail);
        sampleMealData = await saveMealTransaction(sampleMeal1, _id);
    });
    test('should return 401 response while sessionid is missing', function(done) {
        chai.request(server)
            .put(endpoint)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 401 response while sessionid is incorrect', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', uuid.v1())
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 400 response while body is missing with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealName is missing with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                // mealName: sampleMealData.mealName,
                mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealName is incorrect with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                mealName: true,
                mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealDate is missing with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                mealName: sampleMealData.mealName,
                // mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealDate is invalid with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                mealName: sampleMealData.mealName,
                mealDate: '111/1/1',
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealCalories is missing with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                mealName: sampleMealData.mealName,
                mealDate: sampleMealData.mealDate,
                // mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while mealCalories is incorrect with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                mealName: sampleMealData.mealName,
                mealDate: sampleMealData.mealDate,
                mealCalories: 'something',
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while meal id is missing with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                // _id: sampleMealData._id,
                mealName: sampleMealData.mealName,
                mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while meal id is incorrect with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: uuid.v1(),
                mealName: sampleMealData.mealName,
                mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while meal data is correct with different sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId2)
            .send({
                _id: sampleMealData._id,
                mealName: sampleMealData.mealName,
                mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);
                chai.expect(message).to.equal('Failed in updating meal.');

                done();
            });
    });
    test('should return 200 response while meal data is correct with correct sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({
                _id: sampleMealData._id,
                mealName: `updated${sampleMealData.mealName}`,
                mealDate: sampleMealData.mealDate,
                mealCalories: sampleMealData.mealCalories * 2,
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('object');
                
            
                const {
                    mealName,
                    mealDate,
                    mealCalories,
                    _id
                } = body;
                
                chai.expect(mealName).to.be.a('string');
                chai.expect(mealName).to.be.equal(`updated${sampleMealData.mealName}`);
                chai.expect(mealDate).to.be.a('string');
                chai.expect(moment(mealDate, 'YYYY/MM/DD', true).isValid()).to.be.true;
                chai.expect(mealDate).to.be.equal(sampleMealData.mealDate);
                chai.expect(mealCalories).to.be.a('number');
                chai.expect(mealCalories).to.be.equal(sampleMealData.mealCalories * 2);
                chai.expect(isValidObjectId(_id)).to.be.true;
                chai.expect(_id).to.be.equal(sampleMealData._id.toString());


                done();
            });
    });
});

testSuite('API: DELETE /ajax/meal/remove/:mealId [ deleteMeal ]', function() {
    const endpoint = '/ajax/meal/remove/:mealId';
    let userSessionId = undefined;
    let sampleMealsData = undefined;
    let userSessionId2 = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
        userSessionId2 = await CreateSession.create('USER', sampleUserData2.userEmail, sampleUserData2.userPassword);
        const { _id: userId } = await fetchUserByEmailTransaction(sampleUserData1.userEmail);
        sampleMealsData = await fetchMealTransaction({ min: sampleMeal1.mealDate, max: sampleMeal1.mealDate }, userId);
    });
    test('should return 401 response while sessionid is missing', function(done) {
        chai.request(server)
            .delete(endpoint)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 401 response while sessionid is incorrect', function(done) {
        chai.request(server)
            .delete(endpoint)
            .set('sessionid', uuid.v1())
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 400 response with correct sessionid and wrong meal id', function(done) {
        chai.request(server)
            .delete(endpoint.replace(':mealId', uuid.v1()))
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response with correct sessionid and different meal id', function(done) {
        chai.request(server)
            .delete(endpoint.replace(':mealId', sampleMealsData[0]._id.toString()))
            .set('sessionid', userSessionId2)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.be.equal('Failed in deleting meal.');

                done();
            });
    });
    test('should return 200 response with correct sessionid and proper meal id', function(done) {
        chai.request(server)
            .delete(endpoint.replace(':mealId', sampleMealsData[0]._id.toString()))
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('string');
                chai.expect(body).to.be.equal(sampleMealsData[0]._id.toString());

                done();
            });
    });
});

testSuite('API: GET /ajax/meal/fetch [ fetchMeal ]', function() {
    const endpoint = '/ajax/meal/fetch';
    let userSessionId = undefined;
    let sampleUserId = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
        ({ _id: sampleUserId } = await fetchUserByEmailTransaction(sampleUserData1.userEmail));
    });
    test('should return 401 response while sessionid is missing', function(done) {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 401 response while sessionid is incorrect', function(done) {
        chai.request(server)
            .get(endpoint)
            .set('sessionid', uuid.v1())
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(401);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 400 response while sessionid is correct and missing query param', function(done) {
        chai.request(server)
            .get(endpoint)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 400 response while sessionid is correct and improper query param', function(done) {
        chai.request(server)
            .get(`${endpoint}?minRange=11/11/11&maxRange=12/12/12`)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.false;
                chai.expect(res.status).to.equal(400);
                chai.expect(res.body).to.be.a('object');

                const { success, message } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.false;
                chai.expect(message).to.be.a('string');
                chai.expect(message).to.have.length.greaterThan(0);

                done();
            });
    });
    test('should return 200 response while sessionid is correct and proper query param', function(done) {
        chai.request(server)
            .get(`${endpoint}?minRange=${sampleMeal1.mealDate}&maxRange=${sampleMeal1.mealDate}`)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('array');
                chai.expect(body).to.have.length.greaterThanOrEqual(0);

                for(let meal of body) {
                    chai.expect(isValidObjectId(meal._id)).to.be.true;
                    chai.expect(meal.mealName).to.be.a('string');
                    chai.expect(meal.mealDate).to.be.a('string');
                    chai.expect(moment(meal.mealDate, 'YYYY/MM/DD', true).isValid()).to.be.true;
                    chai.expect(meal.mealDate).to.be.equal(sampleMeal1.mealDate);
                    chai.expect(meal.mealCalories).to.be.a('number');
                    chai.expect(meal.mealName).to.be.a('string');
                    chai.expect(isValidObjectId(meal.user)).to.be.true;
                    chai.expect(meal.user).to.be.equal(sampleUserId.toString());
                }

                done();
            });
    });
});