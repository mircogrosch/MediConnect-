const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("../models/Person");

passport.serializeUser((user, done) => {
  done(null, user.dni);
});

passport.deserializeUser(async (dni, done) => {
  let user = await Person.findByPk(dni);
  done(null, user);
});
