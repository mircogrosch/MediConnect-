const { Person, Patient, Doctor } = require("../db");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy;
const app = express();

app.use(
  session({
    secret: "mi  secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new PassportLocal(function (email, password, done) {
    if (email === "elmacro11@gmail.com" && password === "1234") {
      console.log(email);
      return done(null, { id: 1, name: "Marco" });
    } else {
      done(null, false);
    }
  })
);

// Serialización
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialización
passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "Marco" });
});

async function getLogin(req, res) {
  let { email, password, remember } = req.body;
  try {
    let person = await Person.findOne({
      where: {
        email: email,
      },
    });

    if (person !== null) {
      //Si existe persona con ese email
      if (person.password === password) {
        //Si coincide password ingresada con la registrada del usuario
        //Para traer el perfil de DOCTOR
        if (person.rol === "Doctor") {
          let doctor = await Doctor.findOne({
            where: {
              personDni: person.dni,
            },
          });

          person = { ...person, doctor };
          person = {
            person: person.dataValues,
            doctor: person.doctor,
          };
          //Para traer el perfil de PACIENTE
        } else if (person.rol === "Patient") {
          let patient = await Patient.findOne({
            where: {
              personDni: person.dni,
            },
          });
          person = { ...person, patient };
          person = {
            person: person.dataValues,
            patient: person.patient,
          };
        }
        res.status(200).send({
          data: person,
          message: "Logged user",
        });
      } else {
        //Se encontro persona, pero password es incorrecta
        res.status(200).send({ message: "Incorrect password" });
      }
    } else {
      //No se encontro persona con email ingresado
      res.status(200).send({ message: "There is no such registered email" });
    }
  } catch (e) {
    res.status(400).send("Error desde base de datos: ", e);
  }
}

module.exports = {
  getLogin,
};
