const { validateFetchAdminSession, validateCreateUserSession, validateToggleUserActive } = require('../validations/admin');
const { fetchAllUsersTransaction, toggleUserActiveTransaction, createUserSessionTransaction } = require('../transactions/user.transactions');
const { fetchAdminSessionTransaction } = require('../transactions/admin.transactions');
const nconf = require('../conf');
const { takeNodeCache } = require('../middlewares/cachingModule');
const { log } = require('../../utils/logging');

async function fetchAllUsers(req, res, next) {

    const savedResult = await fetchAllUsersTransaction();

    if (!savedResult) {
        log.error('Failure in transacting fetchAllUsers().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching all users.',
        });
    }
    log.info('Successfully fetched all users : ', savedResult.length);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function fetchAdminSession(req, res, next) {
    const credentials = {
        email: req.body.email,
        password: req.body.password,
    };

    const errorJSON = validateFetchAdminSession(credentials);
    if (errorJSON.status) {
        log.error('Failure in validate fetchAdminSession().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    log.info('Successfully validate in fetchAdminSession().');
    const savedResult = await fetchAdminSessionTransaction(credentials);

    if (!savedResult) {
        log.error('Failure in transacting fetchAdminSession().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching admin session.',
        });
    }
    log.info('Successfully fetched admin session : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function toggleUserActive(req, res, next) {
    const userData = {
        _id: req.body._id,
        isActive: req.body.isActive || false,
    };

    const errorJSON = validateToggleUserActive(userData);
    if (errorJSON.status) {
        log.error('Failure in validate toggleUserActive().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    log.info('Successfully validate in toggleUserActive().');
    const savedResult = await toggleUserActiveTransaction(userData);

    if (!savedResult) {
        log.error('Failure in transacting toggleUserActive().');
        return res.status(400).json({
            success: false,
            message: 'Failed in updating user data.',
        });
    }
    log.info('Successfully updated user data : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: userData,
    });
}

async function createUserSession(req, res, next) {
    const userId = req.body._id;

    const errorJSON = validateCreateUserSession(userId);
    if (errorJSON.status) {
        log.error('Failure in validate createUserSession().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    log.info('Successfully validate createUserSession().');
    const savedResult = await createUserSessionTransaction(userId);

    if (!savedResult) {
        log.error('Failure in transacting createUserSession().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching user session.',
        });
    }
    log.info('Successfully fetched user session : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function adminLogout(req, res, next) {    
    try {
        takeNodeCache(nconf.get('ADMIN_SESSION_ID'));
    } catch (error) {
        log.error('Failure in transacting adminLogout().');
        return res.status(400).json({
            success: false,
            message: 'Failed in removing Admin session.',
        });
    }
    
    log.info('Successfully removed Admin session');
  
    return res.status(200).json({
        success: true
    });
}

module.exports = {
    fetchAllUsers,
    fetchAdminSession,
    toggleUserActive,
    createUserSession,
    adminLogout
};