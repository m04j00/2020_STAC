const express = require('express');
const app = express();
const port = 3000;

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
