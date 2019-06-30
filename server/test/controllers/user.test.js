const { suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');
const { isValidObjectId } = require('mongoose');

const { CreateSession } = require('../utils/CreateSession');
const { sampleUserData1, sampleUserData3, sampleUserData4 } = require('../../utils/constants');
const server = require('../../bin/www');
const { saveUserProfileTransaction, fetchUserByEmailTransaction, toggleUserActiveTransaction } = require('../../src/transactions/user.transactions');

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

testSuite('API: PUT /ajax/user/profile/update [ updateUserProfile ]', function () {
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
    test('should return 400 response with correct sessionid and incorrect name', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({ name: 100 })
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
    test('should return 400 response with correct sessionid and incorrect email', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({ email: 'aything@something' })
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
    test('should return 400 response with correct sessionid and incorrect password', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({ password: 'anything' })
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
    test('should return 400 response with correct sessionid and incorrect expectedPerDayIntakeCalorie', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({ expectedPerDayIntakeCalorie: 'something' })
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
                chai.expect(expectedPerDayIntakeCalorie).to.be.equal(sampleUserData3.expectedPerDayIntakeCalorie);
                chai.expect(isActive).to.be.a('boolean');
                chai.expect(isActive).to.be.true;
                chai.expect(_id).to.be.a('string');
                chai.expect(_id).to.have.length.greaterThan(0);
                chai.expect(isValidObjectId(_id)).to.be.true;
                chai.expect(userName).to.be.a('string');
                chai.expect(userName).to.have.length.greaterThan(0);
                chai.expect(userName).to.be.equal(sampleUserData3.userName);
                chai.expect(userEmail).to.be.a('string');
                chai.expect(userEmail).to.have.length.greaterThan(0);
                chai.expect(userEmail).to.match(new RegExp('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'));
                chai.expect(userEmail).to.be.equal(sampleUserData3.userEmail);

                done();
            });
    });
    test('should return 200 response with correct sessionid and correct data', function(done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', userSessionId)
            .send({ 
                name: `updated${sampleUserData3.userName}`,
                email: `updated${sampleUserData3.userEmail}`,
                password: `updated${sampleUserData3.userPassword}`,
                expectedPerDayIntakeCalorie: 500
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
                    expectedPerDayIntakeCalorie,
                    isActive,
                    _id,
                    userName,
                    userEmail,
                } = body;

                chai.expect(expectedPerDayIntakeCalorie).to.be.a('number');
                chai.expect(expectedPerDayIntakeCalorie).to.be.equal(500);
                chai.expect(isActive).to.be.a('boolean');
                chai.expect(isActive).to.be.true;
                chai.expect(_id).to.be.a('string');
                chai.expect(_id).to.have.length.greaterThan(0);
                chai.expect(isValidObjectId(_id)).to.be.true;
                chai.expect(userName).to.be.a('string');
                chai.expect(userName).to.have.length.greaterThan(0);
                chai.expect(userName).to.be.equal(`updated${sampleUserData3.userName}`);
                chai.expect(userEmail).to.be.a('string');
                chai.expect(userEmail).to.have.length.greaterThan(0);
                chai.expect(userEmail).to.match(new RegExp('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'));
                chai.expect(userEmail).to.be.equal(`updated${sampleUserData3.userEmail}`);

                done();
            });
    });
});

testSuite('API: POST /ajax/user/profile/signup [ saveUserProfile ]', function () {
    const endpoint = '/ajax/user/profile/signup';
    
    test('should return 400 response without body', function(done) {
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
    test('should return 400 response with incorrect body', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ 
                name: 10,
                email: 'aything@something',
                password: 'anything'
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
    test('should return 400 response with missing email', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({
                name: sampleUserData4.userName,
                password: sampleUserData4.userPassword
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
    test('should return 400 response with missing name', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({
                email: sampleUserData4.userEmail,
                password: sampleUserData4.userPassword
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
    test('should return 400 response with missing password', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({
                name: sampleUserData4.userName,
                email: sampleUserData4.userEmail
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
    test('should return 400 response with duplicate email entry', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({
                name: sampleUserData1.userName,
                email: sampleUserData1.userEmail,
                password: sampleUserData1.userPassword
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
                chai.expect(message).to.be.equal('Email Id Aleardy Exists.');

                done();
            });
    });
    test('should return 200 response with correct body', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({
                name: sampleUserData4.userName,
                email: sampleUserData4.userEmail,
                password: sampleUserData4.userPassword
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;

                done();
            });
    });
});

testSuite('API: GET /ajax/user/logout [ userLogout ]', function () {
    const endpoint = '/ajax/user/logout';
    let userSessionId = undefined;

    before(async () => {
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
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
    test('should return 200 response with correct sessionid', function(done) {
        chai.request(server)
            .get(endpoint)
            .set('sessionid', userSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;

                done();
            });
    });
});