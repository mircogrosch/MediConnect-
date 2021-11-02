const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/", (req, res) => {

  res.send(req.user);
});

router.get("/fail", (req, res) => {
  res.send({user:null}) 
});

router.post(
  "/",
  passport.authenticate("local", {  
    failureRedirect: "/login/fail",
  }),
  function(req, res) { 
    res.redirect('/login');
  }
);

module.exports = router;
