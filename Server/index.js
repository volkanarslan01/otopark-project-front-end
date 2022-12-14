const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//! import hash
const bcrypt = require("bcrypt");
const saltRounds = 10;

// ! Modules

// ? use express
const app = express();

const db = require("./Middleware/mysqlHandler.js");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // ??

app.use(
  session({
    key: "userID",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24 },
  })
);
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // ? use hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO user (username,password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query("SELECT * FROM user WHERE username = ?", username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      //? hash parse
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Wrong username / password combination!" });
        }
      });
    } else {
      res.send({ message: "User does not exist ! " });
    }
  });
});
// ?  port listen listen all finally
app.listen(3004, () => {
  console.log("server running on 3004");
});

// app.use("/register", require("./Routes/register.js"));

// app.post("/veri", (req, res) => {
//   console.log(req.body);
//   if (req.body.message === "volkan") {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });
