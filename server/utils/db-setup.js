const mongoose = require('mongoose');

const { log } = require('./logging');

exports.connect = url =>
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }).then(() => {
        log.info(`NodeJs connected to ${url}`);
        return Promise.resolve();
    }).catch(err => {
        log.error(err.message);
        return Promise.reject(1);
    });