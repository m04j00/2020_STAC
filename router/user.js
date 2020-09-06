const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const connection = require('../mysql');
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: true }));    //application/x-www-form-urlencoded
router.use(bodyParser.json());

//회원가입 기능 구현
router.post('/join', function (req, res) {
  const user = req.body;
  console.log(user.name, user.email, user.password);
  const salt = bcrypt.genSaltSync();
  const password = bcrypt.hashSync(user.password, salt);

  if (user.name && user.email && user.password) {
    connection.query(`SELECT email FROM user WHERE email = "${user.email}"`, function (error, check_result, fields) {
      if (check_result.length == 0) {
        connection.query(`INSERT INTO user (name, email, password) VALUES ('${user.name}', '${user.email}', '${password}')`,
          function (error, results, rields) {
            if (error) {
              console.log(error);
            }
            res.status(200).json({
              'status': 200,
              'msg': '회원가입에 성공했습니다.'
            });
          });
      } else {
        res.status(400).json({
          'status': 400,
          'msg': '이미 가입된 이메일입니다.'
        });
      }
    });
  } else {
    res.status(400).json({
      'status': 400,
      'msg': '값을 다 채워주세요'
    });
  }
})

// JWT 로그인 구현
router.post('/login', function (req, res) {
  const user = req.body;
  const password = req.body.password;
  let jwt_secret = 'stac';
  console.log(user.email);

  if (user.email) {
    connection.query(`SELECT * FROM user where email = '${user.email}'`, function (error, result, fields) {
      if (error) {
        console.log(error);
      }
      console.log(result);

      if (user.password === password) {
        const getToken = new Promise((resolve, reject) => {
          jwt.sign({
            email: user.email
          },
            jwt_secret, {
            expiresIn: '1h',
          }, (err, token) => {
            if (err) reject(err)
            resolve(token)
          });
        });
        getToken.then(
          token => {
            res.status(200).json({
              'status': 200,
              'msg': '로그인 되었습니다.',
              token
            });
          }
        );
      } else {
        res.status(400).json({
          'status': 400,
          'msg': '비밀번호가 일치하지 않습니다.'
        });
      }
    });
  } else {
    res.status(400).json({
      'status': 400,
      'msg': '존재하지 않는 계정입니다.'
    });
  }
});

//인증 확인
router.get('/check', function(req,res) {
  const token = req.headers['x-access-token'] || req.query.token;
  let jwt_secret = 'stac';
if (!token) {
    res.status(400).json({
      'status': 400,
      'msg': '권한이 없습니다.'
    });
  }
  const checkToken = new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, function (err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  checkToken.then(
    token => {
      console.log(token);
      res.status(200).json({
        'status': 200,
        'msg': 'API 수행이 가능합니다.',
        token
      });
    }
  )
});
 
// 회원정보수정 구현 
router.post('/update', function (req, res) {
  console.log('debug');
  const update = req.body;
  console.log(update.name, update.password);
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  // 1. SET 뒤에도 변수 삽입 하게 바꿈 (동작하는지 확인)
  var query = `UPDATE user SET name='${update.name}', password='${update.password}' WHERE email='${update.email}'`;
  console.log(query);
  connection.query(query);

  res.status(200).json({
    'status': 200,
    'msg': '정보가 변경되었습니다.'
  });

});


module.exports = router;

//VALUES ('${update.name}', '${update.password}','${email}')