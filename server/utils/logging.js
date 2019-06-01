exports.error = (...args) => {
    console.log('\x1b[31m\x1b[1m[ ERROR ]\x1b[0m', ...args);
}

exports.info = (...args) => {
    console.log('\x1b[32m\x1b[1m[ INFO  ]\x1b[0m', ...args);
}

exports.warn = (...args) => {
    console.log('\x1b[33m\x1b[1m[ WARN  ]\x1b[0m', ...args);
}
