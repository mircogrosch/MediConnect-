const { Router } = require("express");
const router = Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/success", isAuthenticated, (req, res) => {
  const token = jwt.sign(req.user, "secret");
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
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect("/login/success");
  }
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
