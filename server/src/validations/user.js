const validator = require('validator');
const mongoose = require('mongoose');

function validateFetchUserSession(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if (typeof data !== 'object' || !data) data = {};

    if (!data.email) errorJSON.message.push('Email is required.');
    if (!data.password) errorJSON.message.push('Password is required.');
    if (!(
        (typeof data.email === 'string') &&
        validator.isEmail(data.email)
    )) errorJSON.message.push('Email is invalid.');
    if (!(
        (typeof data.password === 'string') &&
        (data.password.length >= 8) &&
        data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    )) errorJSON.message.push('Password is invalid.');

    if (errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

function validateUpdateUserProfile(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if (typeof data !== 'object' || !data) data = {};

    if (!data._id) errorJSON.message.push('User Id is required.');
    if (!mongoose.Types.ObjectId.isValid(data._id)) errorJSON.message.push('User Id is invalid.');
    if (data.userEmail &&
        !(
            (typeof data.userEmail === 'string') &&
            validator.isEmail(data.userEmail)
        )) errorJSON.message.push('Email is invalid.');
    if (data.userName &&
        !(
            (typeof data.userName === 'string') &&
            (data.userName.length !== 0)
        )) errorJSON.message.push('Name is invalid.');
    if (data.userPassword &&
        !(
            (typeof data.userPassword === 'string') &&
            (data.userPassword.length >= 8) &&
            data.userPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
        )) errorJSON.message.push('Password is invalid.');
    if (data.expectedPerDayIntakeCalorie &&
        !(
            (typeof data.expectedPerDayIntakeCalorie === 'number')
        )) errorJSON.message.push('expectedPerDayIntakeCalorie is invalid.');


    if (errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

function validateSaveUserProfile(data) {
    const errorJSON = {
        status: false,
        message: [],
    };


    if ((typeof data !== 'object') || !data) data = {};
    if (!data.userEmail) errorJSON.message.push('Email is required.');
    if (!(
        (typeof data.userEmail === 'string') &&
        validator.isEmail(data.userEmail)
    )) errorJSON.message.push('Email is invalid.');
    if (!data.userName) errorJSON.message.push('Name is required.');
    if (!(
        (typeof data.userName === 'string') &&
        (data.userName.length !== 0)
    )) errorJSON.message.push('Name is invalid.');
    if (!data.userPassword) errorJSON.message.push('Password is required.');
    if (!(
        (typeof data.userPassword === 'string') &&
        (data.userPassword.length >= 8) &&
        data.userPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    )) errorJSON.message.push('Password is invalid.');


    if (errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

module.exports = {
    validateFetchUserSession,
    validateUpdateUserProfile,
    validateSaveUserProfile
};