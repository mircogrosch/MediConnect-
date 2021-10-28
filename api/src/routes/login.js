const express = require("express");
const router = express.Router();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy;
const { getLogin } = require("../controllers/login.controllers");

router.get("/", (req, res, next) => {
  res.send("Hola mundo!");
});

router.get("/login", (req, res, next) => {});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  res.send("recive");
});

module.exports = router;
