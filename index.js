const express = require('express');
const app = express();
const port = 3000;
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
  process.send('ready')
  console.log(`application is listening on port ${port}...`)
});

process.on('SIGINT', async () => {
  isDisableKeepAlive = true;
  await app.close();
  console.log('server closed');
  process.exit(0);
  });