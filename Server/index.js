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
const db2 = require("./Middleware/mysql2Handler.js");

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
app.get("/make", (req, res) => {
  db2.query("SELECT * FROM otopark", (err, rows) => {
    res.send(rows);
  });
});
app.get("/maked", (req, res) => {
  db2.query("SELECT * FROM kat1", (err, rows) => {
    res.send(rows);
  });
});
app.put("/update", (req, res) => {
  const kat = req.body.kat1;
  db2.query("UPDATE kat1 SET state = ?", [kat], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows + "undefined");
    }
  });
});
app.get("/last", (req, res) => {
  db.query("SELECT * FROM last_reservation", (err, result) => {
    res.send(result);
    console.log(result);
  });
});
app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const plate = req.body.plate;
  const password = req.body.password;
  console.log(firstName, lastName, email, plate, password);
  // ? use hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO user (first_name,last_name,plate,email,password) VALUES (?,?)",
      [firstName, lastName, plate, email, hash],
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
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM user WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      //? hash parse
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          console.log("Giris BASARILI");
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
