const chai = require('chai');
const chaiHttp = require('chai-http');

const { log } = require('../utils/logging');
const { connect: setupDB } = require('../utils/db-setup');
const get = require('./config.json');
const { saveUserProfileTransaction, removeUsers } = require('../src/transactions/user.transactions');
const { sampleUserData1, sampleUserData2 } = require('../utils/constants');
const { removeMeals } = require('../src/transactions/meal.transactions');



exports.mochaHooks = {
    beforeAll: [
        done => {
            log.test(`NodeJs connecting to ${get['DB-URL']}...`);
            
            if ((process.env.NODE_ENV || '').trim() === 'test') {
                setupDB(get['DB-URL'])
                    .then(_ => {
                        log.test(`NodeJs connected to ${get['DB-URL']}`);
                        done();
                    })
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
            log.test('Creating Users...');

            const result1 = await saveUserProfileTransaction(sampleUserData1);
            const result2 = await saveUserProfileTransaction(sampleUserData2);

            if ((result1 === null) ||
                (result2 === null)) {
                log.test('Creating Users Failed');
                process.exit(1);
            }
            
            log.test('Created Users Successfully');

            Promise.resolve(1);
        }
    ],
    async afterAll() {
        await removeUsers();
        log.test('Users Removed Successfully');

        await removeMeals();
        log.test('Meals Removed Successfully');
    }
}
