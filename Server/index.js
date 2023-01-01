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
// app.use((req, res, next) => {

//   next();
// });

// ! lastReservation Process
app.post("/lastReservations", (req, res) => {
  const time_1 = req.body.time_1;
  const time_2 = req.body.time_2;
  const parkName = req.body.parkName;
  const place = req.body.place;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const pay = req.body.pay;
  const state = req.body.state;
  const email = req.body.email;

  let sql =
    "INSERT INTO last_reservation (parkName,place,time_1,firstName,lastName,pay,state,email,time_2) Values (?,?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [parkName, place, time_1, firstName, lastName, pay, state, email, time_2],
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        console.log(rows);
      }
    }
  );
});

// ! register portion
app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const plate = req.body.plate;
  const password = req.body.password;
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
      if (err) {
        res.send(err);
      } else {
        console.log(result);
      }
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
let email = "";
app.post("/login", (req, res) => {
  email += req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM user WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      //? hash parse
      console.log(result);
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log(response);
        }
      });
    }
  });
});

// ? last get

app.get("/last", (req, res) => {
  let sql = "Select * from last_reservation where email = ? ";
  db.query(sql, [email], (err, rows) => {
    if (err) res.send({ error: err });
    res.send(rows);
  });
});

// ? users get
app.get("/users", (req, res) => {
  let sql = "Select * from user where email = ? ";
  db.query(sql, [email], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});
app.get("/header", (req, res) => {
  let sql = "Select * from user where email = ? ";
  db.query(sql, [email], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

// ! update process

app.put("/update", (req, res) => {
  const kat = req.body.kat_state;
  const parkName = req.body.park_name;
  let sql = "UPDATE otopark SET kat_state = ?  WHERE parkName = ? ";
  console.log(kat, parkName);
  db2.query(sql, [kat, parkName], (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

app.put("/state", (req, res) => {
  const state = req.body.state;
  const id = req.body.id;
  const parkName = req.body.parkNname;
  // const kat = req.body.kat;
  // console.log(kat, state);
  // let sql = "UPDATE otopark SET kat_state = ? WHERE parkName = ?";
  let sql2 = "UPDATE last_reservation SET state = ? WHERE id = ?";
  db.query(sql2, [state, id], (err, rows) => {
    if (err) throw err;
  });
  // db2.query(sql, [kat, parkName], (err, rows) => {
  //   if (err) throw err;
  // });
});

// ?  port listen listen all finally
app.listen(3004, () => {
  console.log("server running on 3004");
});
