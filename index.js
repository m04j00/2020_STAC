'use strict';

const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
process.send = process.send || function () {};

const indexRouter = require('./router/index');
const usersRouter = require('./router/user');
const recodeRouter = require('./router/recode');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/recode', recodeRouter);

app.listen(PORT, function() {
  process.send('ready');
  console.log(`Running on http://${HOST}:${PORT}`);
});
