const { suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');

const { CreateSession } = require('../utils/CreateSession');
const get = require('../config.json');
const { sampleUserData1 } = require('../../utils/constants');
const server = require('../../bin/www');

testSuite('API: GET /ajax/verify/session [ verifySession ]', function () {
    const endpoint = '/ajax/verify/session';
    const query = '?sessionId=<sessionid>';
    let adminSessionId = undefined;
    let userSessionId = undefined;

    before(async () => {
        adminSessionId = await CreateSession.create('ADMIN', get.ADMIN_EMAIL, get.ADMIN_PASSWORD);
        userSessionId = await CreateSession.create('USER', sampleUserData1.userEmail, sampleUserData1.userPassword);
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
                chai.expect(message).to.equal('Session Id is missing.');

                done();
            });
    });
    test('should return 401 response while sessionid is incorrent', function (done) {
        chai.request(server)
            .get(endpoint + query.replace('<sessionid>', uuid.v1()))
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
    test('should return 200 response while passing corrent admin sessionid', function (done) {
        chai.request(server)
            .get(endpoint + query.replace('<sessionid>', adminSessionId))
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('object');

                const { sessionId, role } = body;
                chai.expect(sessionId).to.be.a('string');
                chai.expect(sessionId).to.have.length.greaterThan(0);
                chai.expect(role).to.be.a('string');
                chai.expect(role).to.equal(get.ADMIN_SESSION_ID);

                done();
            });
    });
    test('should return 200 response while passing corrent user sessionid', function (done) {
        chai.request(server)
            .get(endpoint + query.replace('<sessionid>', userSessionId))
            .end((err, res) => {
                chai.expect(res.ok).to.be.true;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.a('object');

                const { success, body } = res.body;
          
                chai.expect(success).to.be.a('boolean');
                chai.expect(success).to.be.true;
                chai.expect(body).to.be.a('object');

                const { sessionId, role } = body;
                chai.expect(sessionId).to.be.a('string');
                chai.expect(sessionId).to.have.length.greaterThan(0);
                chai.expect(role).to.be.a('string');
                chai.expect(role).to.equal(get.USER_SESSION_ID);

                done();
            });
    });
});