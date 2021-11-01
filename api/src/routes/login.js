const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.post("/", (req, res) => {
  console.log("soy Home!", req.user);
});

router.get("/fail", (req, res) => {
  console.log("Soy login!", req.user);
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/login/fail",
  })
);

module.exports = router;
