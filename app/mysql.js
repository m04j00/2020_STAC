const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    con.end();
    throw err;
  }
  else {
    console.log("DB 접속 성공");
  }
});


module.exports = connection;
