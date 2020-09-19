'use strict';

const express = require('express');
const app = express();
const port = 3000;
const HOST = '0.0.0.0';
process.send = process.send || function () {};

let isDisableKeepAlive = false;
app.use(function(request, response, next) {
  if (isDisableKeepAlive) {
    response.set('Connection', 'close');
  }
  next();
});

const indexRouter = require('./router/index');
const usersRouter = require('./router/user');
const recodeRouter = require('./router/recode');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/recode', recodeRouter);

app.listen(port, function() {
  process.send('ready');
  console.log(`Running on http://${HOST}:${PORT}`);
});

process.on('SIGINT', function() { 
  console.log('> received SIGNIT signal');
  isAppGoingToBeClosed = true;
  listeningServer.close(function(err) {
    console.log('server closed');
    process.exit(err ? 1 : 0);
   });
});