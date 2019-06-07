const chai = require('chai');

const server = require('../../bin/www');

class CreateSession {
    /** Create User Session */
    static async create(role, email, pass) {

        const { body: { success, body, message } } =
            await chai.request(server)
                .post(`/ajax/${role.toLocaleLowerCase()}/login`)
                .set('Content-Type', 'application/json')
                .send({
                    "email": email,
                    "password": pass
                });

        if (success) {
            switch (role) {
                case 'USER':
                case 'ADMIN': {
                    return body;
                }
                default: {
                    return null;
                }
            }
        }
    }
}

module.exports = {
    CreateSession,
};