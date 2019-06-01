

const log = require('../utils/logging');
const { connect: setupDB } = require('../utils/db-setup');
const get = require('./config.json');
const { saveUserProfileTransaction, removeUsers } = require('../src/transactions/user.transactions');
const { sampleUserData } = require('../utils/constants');



exports.mochaHooks = {
    beforeAll: [
        done => {
            log.info(`NodeJs connecting to ${get['DB-URL']}...`);
            
            setupDB(get['DB-URL'])
                .then(_ => done())
                .catch(_ => process.exit(1));
        },
        async () => {
            log.info('Creating User...');

            const result = await saveUserProfileTransaction(sampleUserData);

            if (result === null) {
                log.error('Creating User Failed');
                process.exit(1);
            }

            Promise.resolve(1);
        }
    ],
    async afterAll() {
        await removeUsers();
    }
}
