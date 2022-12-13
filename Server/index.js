const express = require("express");
// ! Modules

// ? use express
const app = express();

const router = express.Router();
const cors = require("cors");

const bodyParser = require("body-parser");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // ??

app.use("/register", require("./Routes/register.js"));

app.post("/veri", (req, res) => {
  console.log(req.body);
  if (req.body.message === "volkan") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ?  port listen listen all finally
app.listen(3004, () => {
  console.log("server running on 3004");
});
