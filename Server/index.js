const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//! import hash
const bcrypt = require("bcrypt");
const saltRounds = 10;

//? jsonwebtoken

const jwt = require("jsonwebtoken");

// ! Modules

// ? use express
const app = express();

const db = require("./Middleware/mysqlHandler.js");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // ??

app.use(
  session({
    key: "userId ",
    secret: "subscribe",
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
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("You , we need to token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authorized" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("You are authorized Congrats!");
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
          // ? projede her seferinde girilen username ve password ayni olabilir ama id olamaz buna bagli olarak
          //? token ureticez
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtsecret", {
            expiresIn: 300,
          });
          req.session.user = result;
          res.json({ auth: true, token: token, result: result });
        } else {
          res.send({
            auth: false,
            message: "Wrong username / password combination!",
          });
        }
      });
    } else {
      res.json({ auth: false, message: "no users exists" });
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
