const mysql = require('mysql');
 
const connection  = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0620',
  database: 'stac2020'
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