const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../mysql');
const setting = require('../setting');
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.send('녹음 파일 구현')
})

//녹음 파일 저장 기능 구현
router.post('/upload', function (req, res) {
    const token = req.headers['x-access-token'] || req.query.token;
    let jwt_secret = 'stac';
    if (!token) {
        return res.status(403).send("유효하지 않은 Token입니다.");
    }

    jwt.verify(token, jwt_secret, function (err, decoded) { // 2. 계정 유효한 경우에만 아래 로직 실행
        const email = decoded.email;

        if (!req.files || Object.keys(req.files).length === 1) {
            return res.status(400).send("파일 업로드 형식이 올바르지 않습니다.");
        }
        const record = req.files.record;
        const record_size = record.size;
        const now_datetime = new Date().toISOString();
        const record_hash = record.name + now_datetime;

        console.log(file.hash, file.size);
        connection.query(`INSERT INTO recode (hash, size) VALUES ('${record_hash}', '${record_size}')`, (error, result) => {
            if (error) {
                throw error;

            } else {
                res.status(200).json({
                    'status': 200,
                    'msg': '파일이 업로드 되었습니다.'
                });
            }
        })

        var sql = `SELECT num FROM record WHERE hash='${record_hash}' AND size='${record_size}'`;

        const file_num = sql;
        // 3. SELECT로 방금 넣은 파일 num 가져오기
        const file_path = setting.file_path_prefix + email + file_num;
        record.mv(file_path);
        return res.status(200).send(file_num);
    })
})
 
// 4. 녹음 파일 내려받기
router.post('/download', (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token;
    let jwt_secret = 'stac';
    if (!token) {
        return res.status(403).send("유효하지 않은 Token입니다.");
    }

    jwt.verify(token, jwt_secret, function (err, decoded) { // 2. 계정 유효한 경우에만 아래 로직 실행
        const email = decoded.email;
        const file_num = req.body.file_num

        const file_path = setting.file_path_prefix + email + file_num;
        
        return res.sendFile(file_path, options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('sent:', file_path)
            }
        }) // node express 에서 파일 보내기
    });
});

module.exports = router;
