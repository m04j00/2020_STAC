const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./router/index');
const usersRouter = require('./router/user');

app.use('/', indexRouter);
app.use('/user', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })