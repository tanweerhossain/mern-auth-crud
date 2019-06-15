const { suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');

const { CreateSession } = require('../utils/CreateSession');
const get = require('../config.json');
const { sampleUserData1, sampleUserData3 } = require('../../utils/constants');
const server = require('../../bin/www');
const { log } = require('../../utils/logging');
const { saveUserProfileTransaction, fetchUserByEmailTransaction, toggleUserActiveTransaction } = require('../../src/transactions/user.transactions');
const { isValidObjectId } = require('mongoose');

testSuite('API: POST /ajax/user/login [ fetchUserSession ]', function () {
    const endpoint = '/ajax/user/login';
    let userSessionId = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
    });
    test('should return 400 response while body is missing', function (done) {
        chai.request(server)
            .post(endpoint)
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
    test('should return 400 response while password is missing', function (done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: sampleUserData1.userEmail })
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
    test('should return 400 response while password is incorrect', function (done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: sampleUserData1.userEmail, password: 'something' })
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
    test('should return 400 response while email is missing', function (done) {
        chai.request(server)
            .post(endpoint)
            .send({ password: sampleUserData1.userPassword })
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
    test('should return 400 response while email is incorrect', function (done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: 'something', password: sampleUserData1.userPassword })
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
    test('should return 400 response while credentials are incorrect', function (done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: sampleUserData1.userEmail, password: '#'+ sampleUserData1.userPassword })
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
    test('should return 200 response while corrent credentials', function (done) {
        chai.request(server)
            .post(endpoint)
            .send({
                email: sampleUserData1.userEmail,
                password: sampleUserData1.userPassword
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('string');
                chai.expect(body).to.have.length.greaterThan(0);

                done();
            });
    });
});

testSuite('API: GET /ajax/user/profile/fetch [ fetchUserProfile ]', function () {
    const endpoint = '/ajax/user/profile/fetch';
    let userSessionId = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
        await saveUserProfileTransaction(sampleUserData3);
    });
    test('should return 401 response while sessionid is missing', function (done) {
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
    test('should return 401 response while sessionid is incorrect', function (done) {
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
    test('should return 400 response with correct sessionid and inactive user account', async function() {
        // Here 400 response can't be created as session can't be created for the inactive user accounts.
        // Hence this test check only satisfied after user creation failed.
        const sessionId = await CreateSession.create('USER', sampleUserData3.userEmail, sampleUserData3.userPassword);
        
        chai.expect(sessionId).to.equal(undefined);
        Promise.resolve();
    });
    test('should return 200 response with corrent sessionid and the user account is activated', function (done) {
        chai.request(server)
            .get(endpoint)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('object');
                
                
                const {
                    expectedPerDayIntakeCalorie,
                    isActive,
                    _id,
                    userName,
                    userEmail,
                } = body;

                chai.expect(expectedPerDayIntakeCalorie).to.be.a('number');
                chai.expect(isActive).to.be.a('boolean');
                chai.expect(isActive).to.be.true;
                chai.expect(_id).to.be.a('string');
                chai.expect(_id).to.have.length.greaterThan(0);
                chai.expect(isValidObjectId(_id)).to.be.true;
                chai.expect(userName).to.be.a('string');
                chai.expect(userName).to.have.length.greaterThan(0);
                chai.expect(userEmail).to.be.a('string');
                chai.expect(userEmail).to.have.length.greaterThan(0);
                chai.expect(userEmail).to.match(new RegExp('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'));

                done();
            });
    });
});

testSuite('API: PUT /ajax/user/profile/update [ fetchUserProfile ]', function () {
    const endpoint = '/ajax/user/profile/update';
    let userSessionId = undefined;

    before(async () => {
        const { _id } = await fetchUserByEmailTransaction(sampleUserData3.userEmail);
        
        await toggleUserActiveTransaction({ _id, isActive: true });
        userSessionId = await CreateSession.create('USER', sampleUserData3.userEmail, sampleUserData3.userPassword);
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
    test('should return 200 response with correct sessionid and missing body', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('object');

                const {
                    expectedPerDayIntakeCalorie,
                    isActive,
                    _id,
                    userName,
                    userEmail,
                } = body;

                chai.expect(expectedPerDayIntakeCalorie).to.be.a('number');
                chai.expect(isActive).to.be.a('boolean');
                chai.expect(isActive).to.be.true;
                chai.expect(_id).to.be.a('string');
                chai.expect(_id).to.have.length.greaterThan(0);
                chai.expect(isValidObjectId(_id)).to.be.true;
                chai.expect(userName).to.be.a('string');
                chai.expect(userName).to.have.length.greaterThan(0);
                chai.expect(userEmail).to.be.a('string');
                chai.expect(userEmail).to.have.length.greaterThan(0);
                chai.expect(userEmail).to.match(new RegExp('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'));

                done();
            });
    });
});