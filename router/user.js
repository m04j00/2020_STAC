const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const connection = require('../mysql');
// express()는 application 객체를 반환하고,
// express.Router()는 router 객체를 반환한다.

router.use(bodyParser.urlencoded({ extended: true }));    //application/x-www-form-urlencoded
router.use(bodyParser.json());

router.post('/join', function (req, res) {
  const user = req.body;
  console.log(user.name, user.email, user.password);
  const salt = bcrypt.genSaltSync();
  const encryptedPassword = bcrypt.hashSync(user.password, salt);
  var sql = `INSERT INTO user (name, email, password) VALUES ('${user.name}', '${user.email}', '${encryptedPassword}')`;
  console.log(sql);
  connection.query(sql, function (error, result) {
    var message = '에러가 발생했습니다';
    if (error) {
      throw error;
    } else {
      message = '회원가입에 성공했습니다.';
    }
    res.send({
      'message': message
    })
  })
})

router.post('/login', function (req, res) {
  const user = req.body;
  console.log(user.email, user.password);
  var password = req.body.password;

  var sql = `SELECT * FROM user where email=? VALUES ('${user.email}')`;
  console.log(sql);
  connection.query(sql, function (error, result) {
    var message = '에러가 발생했습니다';

    if (user.email === undefined) {
      message = '존재하지 않는 계정입니다.';
    } else if (user.password !== password) {
      message = '비밀번호가 일치하지 않습니다.';
    } else {
      message = '로그인에 성공했습니다.'
    }
    res.json({
      'message': message
    });
  })
})
/*
router.post('/update', function (req, res) {
  const update = req.body;
  console.log(update.name, update.password);
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;

  var sql = `UPDATE user SET name=?, password=? WHERE email=? VALUES ('${update.name}', '${update.password}','${email}')`;
  console.log(sql);
  var message = '에러가 발생했습니다';

  if (update.name == name || update.password == password) {
    message = '정보가 수정되었습니다.';
  };

  res.json({
    'message': message
  });
});
*/

module.exports = router;