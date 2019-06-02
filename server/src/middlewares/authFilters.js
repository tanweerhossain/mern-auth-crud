const { getNodeCache } = require('./cachingModule');
const nconf = require('../conf');
const { log } = require('../../utils/logging');

async function adminFilter(req, res, next) {
    const sessionId = req.headers.sessionid;

    if (!sessionId) {
        log.error('Session Id Missing in authFilter().');
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

    if (sessionId === getNodeCache(nconf.get('ADMIN_SESSION_ID'))) {
        log.info('ADMIN Session Verified Successfully in authFilter().');
        req.metaData = {
            role: 'ADMIN',
            sessionId: getNodeCache(nconf.get('ADMIN_SESSION_ID'))
        }
        return next();
    }


    log.error('Session Expired in authFilter().');

    return res.status(401).json({
        success: false,
        message: 'Unauthorized Access'
    });
}

async function userFilter(req, res, next) {
    const sessionId = req.headers.sessionid;

    if (!sessionId) {
        log.error('Session Id Missing in userFilter().');
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

    if (getNodeCache(sessionId)) {
        log.info('USER Session Verified Successfully in userFilter().');
        req.metaData = {
            role: 'USER',
            _id: getNodeCache(sessionId),
            sessionId: sessionId,
        };
        return next();
    }


    log.error('Session Expired in userFilter().');

    return res.status(401).json({
        success: false,
        message: 'Unauthorized Access'
    });
}

module.exports = {
    adminFilter,
    userFilter
};