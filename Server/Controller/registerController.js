const mysql = require("../Middleware/mysqlHandler.js");

const handleNewUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "username or password are required" });
  }

  let sql = "SELECT username FROM user_table WHERE username=?";

  mysql.query(sql, [username], (err, rows) => {
    if (err) return console.log(err);
    if (rows.length < 1) {
      // ! kullanici yok yeni kullanici olustur

      createNewUser(req, res);
    } else {
      res.json({ message: "username is already taken" });
      console.log(rows[0]);
    }
  });
};

const createNewUser = (req, res) => {
  const { username, password } = req.body;
  const sql = "INSERT INTO user_table (username, password) VALUES (?,?)";
  mysql.query(sql, [username, password], (err, rows) => {
    if (err) {
      res.json({ message: "Unhandler Error!", error: err.message });
      return console.log(err);
    }
    res.status(200).json({ message: "Successfuly Registered" });
  });
};

module.exports = { handleNewUser };
