const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/register", (req, res) => {
  console.log("soy Home!", req.user);
});

router.get("/fail", (req, res) => {
  console.log("Soy login!", req.user);
});
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login/fail",
  }),
  function (req, res) {
    res.redirect("/login/register");
  }
);

module.exports = router;
