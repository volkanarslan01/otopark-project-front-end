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

// ? mysql page connect
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

// ? otopark get
app.get("/otopark", (req, res) => {
  let sql = "Select * from otopark ";
  db2.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

// ? users get
app.get("/users", (req, res) => {
  let sql = "Select * from user where id = 8";
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

// ! post process
app.post("/lastReservations", (req, res) => {
  const parkName = req.body.parkName;
  const place = req.body.place;
  const timeInterval = req.body.timeInterval;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const pay = req.body.pay;
  const state = req.body.state;

  let sql =
    "INSERT INTO last_reservation (parkName,place,timeInterval,firstName,lastName,pay,state) Values (?,?,?,?,?,?,?)";

  db.query(
    sql,
    [parkName, place, timeInterval, firstName, lastName, pay, state],
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        console.log(rows);
      }
    }
  );
});

app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const plate = req.body.plate;
  const password = req.body.password;
  console.log(firstName);
  const sql =
    "INSERT INTO user (first_name,last_name,plate,email,password) VALUES (?,?,?,?,?)";
  // ? use hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
    }
    db.query(sql, [firstName, lastName, plate, email, hash], (err, result) => {
      console.log(result);
    });
  });
});

// ! token portion
// const verifyJWT = (req, res, next) => {
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     res.send("You , we need to token");
//   } else {
//     jwt.verify(token, "jwtSecret", (err, decoded) => {
//       if (err) {
//         res.json({ auth: false, message: "U failed to authorized" });
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     });
//   }
// };

// app.get("/isUserAuth", verifyJWT, (req, res) => {
//   res.send("You are authorized Congrats!");
// });

// ! login process
// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM user WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      //? hash parse
      console.log(result);
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          console.log("Giris BASARILI");
        }
      });
    }
  });
});
// ?  port listen listen all finally
app.listen(3004, () => {
  console.log("server running on 3004");
});
