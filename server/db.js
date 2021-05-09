var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "920Master.",
  database: "drone_repair",
  insecureAuth: true,
  multipleStatements: true,//plusieur qwery en meme temps
});
conn.connect(function (err) {if (err) console.log(err);});
module.exports = conn;
