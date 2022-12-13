// ?
const express = require("express");

const router = express.Router();

const { handleNewUser } = require("../Controller/registerController.js");

router.route("/").post((req, res) => {
  handleNewUser(req, res);
});
module.exports = router;
