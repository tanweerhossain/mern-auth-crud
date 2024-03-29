const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./src/controllers/index');
const nconf = require('./src/conf');
const { connect: setupDB } = require('./utils/db-setup');

const app = express();
const NODE_ENV = process.env.NODE_ENV || '';

if (NODE_ENV.trim() !== 'test') {
  setupDB(nconf.get('DB-URL'));
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  'Access-Control-Allow-Origin': '*',
  'access-control-allow-methods': 'OPTIONS,GET,POST,PUT,HEAD,DELETE',
  // 'content-type': 'application/json',
  'access-control-allow-headers': 'sessionId,Content-Type',
}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/ajax', indexRouter);
// app.get('/*', (_, res) => {
//   res.sendFile(path.resolve(process.cwd(), 'build', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
