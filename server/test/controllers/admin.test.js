const { strict: assert } = require('assert');
const { after, suite: testSuite, test } = require('mocha');
const chai = require('chai');
const uuid = require('uuid');

const { get } = require('../../src/conf/index');
const server = require('../../bin/www');
const { log } = require('../../utils/logging');

testSuite('API: GET /admin/fetch/users [ fetchAllUsers ]', function () {
    const endpoint = '/ajax/admin/fetch/users';

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
});