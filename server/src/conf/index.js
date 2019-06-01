const DEV_CONF = require('./dev.json');
const PROD_CONF = require('./prod.json');

const get = (key) => {
    const ENV = process.env.NODE_ENV;

    switch(ENV) {
        case 'prod': {
            return PROD_CONF[key];
        }
        default: {
            return DEV_CONF[key];
        }
    }
}

module.exports = {
    get,
};