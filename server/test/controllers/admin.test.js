const { strict: assert } = require('assert');
const { after, suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');

const server = require('../../bin/www');
const { CreateSession } = require('../utils/CreateSession');
const get = require('../config.json');
const { log } = require('../../utils/logging');
const { fetchUserByEmailTransaction } = require('../../src/transactions/user.transactions');
const { sampleUserData2 } = require('../../utils/constants');

testSuite('API: GET /ajax/admin/fetch/users [ fetchAllUsers ]', function () {
    const endpoint = '/ajax/admin/fetch/users';
    let adminSessionId = undefined;

    before(async () => {
        adminSessionId = await CreateSession.create('ADMIN', get.ADMIN_EMAIL, get.ADMIN_PASSWORD);
    });

    test('should return 401 response while missing sessionid', function (done) {
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
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 401 response while incorrect sessionid', function (done) {
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
    test('should return 200 response on correct sessionid', function (done) {
        chai.request(server)
            .get(endpoint)
            .set('sessionid', adminSessionId)
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('array');
                for (const element of body) {
                    chai.expect(element).to.be.a('object');

                    const {
                        expectedPerDayIntakeCalorie,
                        isActive,
                        _id,
                        userName,
                        userEmail,
                    } = element;
                    chai.expect(expectedPerDayIntakeCalorie).to.be.a('number');
                    chai.expect(isActive).to.be.a('boolean');
                    chai.expect(_id).to.be.a('string');
                    chai.expect(_id).to.have.length.greaterThan(0);
                    chai.expect(userName).to.be.a('string');
                    chai.expect(userName).to.have.length.greaterThan(0);
                    chai.expect(userEmail).to.be.a('string');
                    chai.expect(userEmail).to.have.length.greaterThan(0);
                    chai.expect(userEmail).to.match(new RegExp('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'));
                }

                done();
            });
    });
});

testSuite('API: POST /ajax/admin/login [ fetchAdminSession ]', function() {
    const endpoint = '/ajax/admin/login';

    test('should return 400 response while body is missing', function(done) {
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
    test('should return 400 response while email is missing', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ password: get.ADMIN_PASSWORD })
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
    test('should return 400 response while password is missing', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: get.ADMIN_EMAIL })
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
    test('should return 400 response while email is improper', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: 'anything@domain', password: get.ADMIN_PASSWORD })
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
    test('should return 400 response while password is improper', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: get.ADMIN_EMAIL, password: 'anything' })
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
    test('should return 400 response while credentials are invalid', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: get.ADMIN_EMAIL, password: get.ADMIN_PASSWORD + '0' })
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
    test('should return 200 response on correct credentials', function(done) {
        chai.request(server)
            .post(endpoint)
            .send({ email: get.ADMIN_EMAIL, password: get.ADMIN_PASSWORD })
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

testSuite('API: PUT /ajax/admin/toggle/user/active [ toggleUserActive ]', function() {
    const endpoint = '/ajax/admin/toggle/user/active';
    let adminSessionId = undefined;
    let sampleUserId = undefined;

    before(async () => {
        adminSessionId = await CreateSession.create('ADMIN', get.ADMIN_EMAIL, get.ADMIN_PASSWORD);
        ({ _id: sampleUserId } = await fetchUserByEmailTransaction(sampleUserData2.userEmail));
    });
    test('should return 401 response while missing sessionid', function (done) {
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
                chai.expect(message).to.equal('Unauthorized Access');

                done();
            });
    });
    test('should return 401 response while incorrect sessionid', function (done) {
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
    test('should return 400 response while passing no body and proper sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', adminSessionId)
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
    test('should return 400 response while passing incorrect user id and proper sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', adminSessionId)
            .send({
                _id: uuid.v1(),
                isActive: false
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
    test('should return 400 response while passing incorrect active status and proper sessionid', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', adminSessionId)
            .send({
                _id: sampleUserId,
                isActive: 'anything'
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
    test('should return 200 response on correct sessionid and data', function (done) {
        chai.request(server)
            .put(endpoint)
            .set('sessionid', adminSessionId)
            .send({
                _id: sampleUserId,
                isActive: true
            })
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('object');

                const { isActive,  _id } = body;

                chai.expect(isActive).to.be.a('boolean');
                chai.expect(_id).to.be.a('string');
                chai.expect(_id).to.have.length.greaterThan(0);

                done();
            });
    });
});