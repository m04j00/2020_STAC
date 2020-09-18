const express = require('express');
const app = express();
const port = 3000;

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

process.on('SIGINT', function () {
  isDisableKeepAlive = true;
  app.close(function () {
  console.log('server closed')
  process.exit(0);
  });
});
