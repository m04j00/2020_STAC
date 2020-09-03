const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const connection = require('../mysql');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send('녹음 파일 구현')
})

//1. 녹음 파일 저장 기능 구현
router.post('/upload', function (req, res) {
    const file = req.body;
    console.log(file.uid, file.hash, file.size);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(file.hash, salt);
    var sql = `INSERT INTO recode (uid, hash, size) VALUES ('${file.uid}', '${hash}', '${file.size}')`;
    console.log(sql);
    connection.query(sql, function (error, result) {
        var message = '에러가 발생했습니다';
        if (error) {
            throw error;
        } else {
            message = '업로드 되었습니다.';
        }
        res.send({
            'message': message
        })
    })
})

module.exports = router;