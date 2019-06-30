const { suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');
const { isValidObjectId } = require('mongoose');
const moment = require('moment');

const { CreateSession } = require('../utils/CreateSession');
const get = require('../config.json');
const { sampleUserData1, sampleUserData3, sampleUserData4, sampleMeal1 } = require('../../utils/constants');
const server = require('../../bin/www');
const { log } = require('../../utils/logging');
const { saveUserProfileTransaction, fetchUserByEmailTransaction, toggleUserActiveTransaction } = require('../../src/transactions/user.transactions');

testSuite('API: POST /ajax/meal/save [ addMeal ]', function () {
    const endpoint = '/ajax/meal/save';
    let userSessionId = undefined;
    let sampleUserId = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
        ({ _id: sampleUserId } = await fetchUserByEmailTransaction(sampleUserData1.userEmail));
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
            } = body;

            chai.expect(mealName).to.be.a('string');
            chai.expect(mealName).to.be.equal(sampleMeal1.mealName);
            chai.expect(mealDate).to.be.a('string');
            chai.expect(moment(mealDate, 'YYYY/MM/DD', true).isValid()).to.be.true;
            chai.expect(mealDate).to.be.equal(sampleMeal1.mealDate);
            chai.expect(mealCalories).to.be.a('number');
            chai.expect(mealCalories).to.be.equal(sampleMeal1.mealCalories);           

            done();
        });
});
});