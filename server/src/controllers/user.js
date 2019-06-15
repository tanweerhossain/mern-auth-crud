const { validateFetchUserSession, validateUpdateUserProfile, validateSaveUserProfile } = require('../validations/user');
const { fetchUserSessionTransaction, fetchUserProfileTransaction, updateUserProfileTransaction, saveUserProfileTransaction } = require('../transactions/user.transactions');
const { takeNodeCache } = require('../middlewares/cachingModule');
const { log } = require('../../utils/logging');

async function fetchUserSession(req, res, next) {
  const credentials = {
      email: req.body.email,
      password: req.body.password,
  };

  const errorJSON = validateFetchUserSession(credentials);
  if(errorJSON.status) {
      log.error('Failure in validate fetchUserSession().');
      return res.status(400).json({
          success: false,
          message: errorJSON.message,
      });
  }
  log.info('Successfully validate fetchUserSession().');
  const savedResult = await fetchUserSessionTransaction(credentials);

  if(!savedResult) {
      log.error('Failure in transacting fetchUserSession().');
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

async function fetchUserProfile(req, res, next) {
    const userId = req.metaData._id;
    const savedResult = await fetchUserProfileTransaction(userId);
  
    if(!savedResult) {
        log.error('Failure in transacting fetchUserProfile().');
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

async function updateUserProfile(req, res, next) {
    const userData = {
        _id: req.metaData._id,
        userName: req.body.name,
        userEmail: req.body.email,
        userPassword: req.body.password,
        expectedPerDayIntakeCalorie: req.body.expectedPerDayIntakeCalorie
    };
  
    const errorJSON = validateUpdateUserProfile(userData);
    if(errorJSON.status) {
        log.error('Failure in validate updateUserProfile().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    log.info('Successfully validate updateUserProfile().');

    const savedResult = await updateUserProfileTransaction(userData);
  
    if(!savedResult) {
        log.error('Failure in transacting fetchUserProfile().');
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

async function saveUserProfile(req, res, next) {
    const userData = {
        userName: req.body.name,
        userEmail: req.body.email,
        userPassword: req.body.password,
    };
  
    const errorJSON = validateSaveUserProfile(userData);
    if(errorJSON.status) {
        log.error('Failure in validate saveUserProfile().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    log.info('Successfully validate saveUserProfile().');

    const savedResult = await saveUserProfileTransaction(userData);
  
    if(!savedResult) {
        log.error('Failure in transacting saveUserProfile().');
        return res.status(400).json({
            success: false,
            message: 'Email Id Aleardy Exists.',
        });
    }
    log.info('Successfully saved user profile : ', !!savedResult);
  
    return res.status(200).json({
        success: true
    });
}

async function userLogout(req, res, next) {
    const sessionId = req.metaData.sessionId;
    const userId = req.metaData._id;
    
    try {
        takeNodeCache(sessionId);
    } catch (error) {
        log.error('Failure in transacting userLogout().');
        return res.status(400).json({
            success: false,
            message: 'Failed in removing user session.',
        });
    }
    
    log.info('Successfully removed user session : ', userId);
  
    return res.status(200).json({
        success: true
    });
}

module.exports = {
  fetchUserSession,
  fetchUserProfile,
  updateUserProfile,
  saveUserProfile,
  userLogout,
};
