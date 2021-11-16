const { Router } = require("express");
const router = Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/success", (req, res) => {
  console.log("ESTE ES EL SUCCESS",req.user);
  const token = jwt.sign(req.user, "secret");
  console.log("ESTE ES EL TOKEN", token)
  //respuesta un token
  res.send({
    token,
  });
});

router.get("/fail", (req, res) => {
  res.send({
    user: null,
    message: req.flash("loginMessage")[0],
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login/fail",
    successRedirect:"/login/success",
    failureFlash: true,
  })
);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login/fail");
  }
}

router.get("/boludes", (req, res) => {
  res.send("SOY UN BOLUDO!");
});

module.exports = router;
