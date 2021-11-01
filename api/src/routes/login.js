const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/register", (req, res) => {
  console.log('llegooo----',res)
  res.send(res.user);
});

router.get("/fail", (req, res) => {
  res.redirect("/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/login/register",
    failureRedirect: "/login/fail",
  })
);

module.exports = router;
