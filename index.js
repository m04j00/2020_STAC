const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./router/index');
const usersRouter = require('./router/user');
const recodeRouter = require('./router/recode');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/recode', recodeRouter);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })