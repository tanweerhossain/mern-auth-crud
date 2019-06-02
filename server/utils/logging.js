const NODE_ENV = (process.env.NODE_ENV || '').trim();

exports.log = {
    error(...args) {
        if (NODE_ENV !== 'test') console.log('\x1b[31m\x1b[1m[ ERROR ]\x1b[0m', ...args);
    },
    info(...args) {
        if (NODE_ENV !== 'test') console.log('\x1b[32m\x1b[1m[ INFO  ]\x1b[0m', ...args);
    },
    warn(...args) {
        if (NODE_ENV !== 'test') console.log('\x1b[33m\x1b[1m[ WARN  ]\x1b[0m', ...args);
    },
    test(...args) {
        if (NODE_ENV === 'test')  console.log('\x1b[33m\x1b[1m[ TEST  ]\x1b[0m', ...args);
    }
}
