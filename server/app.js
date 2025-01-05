const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const subjectAreasRouter = require('./routes/subjectAreas');
const studyProgrammesRouter = require('./routes/studyProgrammes');
const departmentRouter = require('./routes/department');
const institutionRouter = require('./routes/institutions');
<<<<<<< HEAD
const applicationRouter = require('./routes/applications');
=======
const mobilityRouter = require('./routes/mobility');
>>>>>>> 800860d5524fb354f69dda4787fd7348e6b8893f

const { connectDB } = require('./config/database');

const app = express();
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subjectAreas', subjectAreasRouter);
app.use('/studyProgrammes', studyProgrammesRouter);
app.use('/auth', authRouter);
app.use('/departments', departmentRouter);
app.use('/institutions', institutionRouter);
<<<<<<< HEAD
app.use('/applications', applicationRouter);
=======
app.use('/mobilities', mobilityRouter);
>>>>>>> 800860d5524fb354f69dda4787fd7348e6b8893f

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
  res.render('error');
});

module.exports = app;
