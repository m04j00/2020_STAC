'use strict';

import express from 'express';
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
process.send = process.send || function () {};

import indexRouter from './router/index';
import usersRouter from './router/user';
import recodeRouter from './router/recode';

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/recode', recodeRouter);

app.listen(PORT, function() {
  process.send('ready');
  console.log(`Running on http://${HOST}:${PORT}`);
});
