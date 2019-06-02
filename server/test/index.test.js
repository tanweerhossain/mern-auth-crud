const chai = require('chai');
const chaiHttp = require('chai-http');

const { log } = require('../utils/logging');
const { connect: setupDB } = require('../utils/db-setup');
const get = require('./config.json');
const { saveUserProfileTransaction, removeUsers } = require('../src/transactions/user.transactions');
const { sampleUserData } = require('../utils/constants');



exports.mochaHooks = {
    beforeAll: [
        done => {
            log.test(`NodeJs connecting to ${get['DB-URL']}...`);
            
            if ((process.env.NODE_ENV || '').trim() === 'test') {
                setupDB(get['DB-URL'])
                    .then(_ => done())
                    .catch(_ => process.exit(1));
            } else {
                process.exit(1);
            }
        },
        done => {
            /** Integration Testing Setup
             *  Chai HTTP provides an interface for live integration testing via superagent
             */
            chai.use(chaiHttp);
            done();
        },
        async () => {
            log.test('Creating User...');

            const result = await saveUserProfileTransaction(sampleUserData);

            if (result === null) {
                log.test('Creating User Failed');
                process.exit(1);
            }
            
            log.test('Created User Successfully');

            Promise.resolve(1);
        }
    ],
    async afterAll() {
        await removeUsers();
    }
}
