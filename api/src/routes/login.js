const express = require("express");
let app = express();
const passport = require("passport");

app.post("/", (req, res) => {
  res.send(req.user);
});

app.post("/login", (req, res) => {
  res.send("Soy lo");
});

app.post(
  "/register",
  passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/login/login",
  })
);

module.exports = app;
