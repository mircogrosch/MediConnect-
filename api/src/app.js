const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const loginRouter = require("./routes/login");
const patientRouter = require("./routes/patients");
const doctorRouter = require("./routes/doctor");
let { Person, Patient, Doctor } = require("./db");
let passport = require("passport");
let Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const specialitiesRouter = require("./routes/specialities");

require("./db.js");

//Para poder comparar con la password encrypt
function comparePassword(password, passwordDB) {
  return bcrypt.compareSync(password, passwordDB);
}

//Configuración de estrategia local
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        let user = await Person.findOne({
          where: {
            email: username,
          },
        });

        if (user !== null) {
          //Si existe usera con ese email

          if (comparePassword(password, user.password)) {
            //Si coincide password ingresada con la registrada del usuario
            //Para traer el perfil de DOCTOR
            if (user.rol === "Doctor") {
              try {
                let doctor = await Doctor.findOne({
                  where: {
                    personDni: user.dni,
                  },
                });
                user = { ...user, doctor };
                user = {
                  user: user.dataValues,
                  doctor: user.doctor,
                };
              } catch (e) {
                console.log("Error al traer al doctor: ", e);
              }
              //Para traer el perfil de PACIENTE
            } else if (user.rol === "Patient") {
              try {
                let patient = await Patient.findOne({
                  where: {
                    personDni: user.dni,
                  },
                });
                user = { ...user, patient };
                user = {
                  user: user.dataValues,
                  patient: user.patient,
                };
              } catch (e) {
                console.log("Error al traer al paciente: ", e);
              }
            }
            // res.status(200).send({
            //   data: user,
            //   message: "Logged user",
            // });
            done(null, user);
          } else {
            //Se encontro usera, pero password es incorrecta
            // res.status(200).send({ message: "Incorrect password" });
            done(null, false, { message: "Incorrect password" });
          }
        } else {
          //No se encontro usera con email ingresado
          // res.status(200).send({ message: "There is no such registered email" });
          done(null, false, { message: "There is no such registered email" });
        }
      } catch (error) {
        // res.status(400).send("Error desde base de datos: ", e);
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("USER:", user.user);
  return done(null, user.user.dni);
});

passport.deserializeUser(async function (dni, done) {
  try {
    let user = await Person.findOne({
      where: {
        dni: dni,
      },
    });
    //Para traer el perfil de DOCTOR
    if (user.rol === "Doctor") {
      try {
        let doctor = await Doctor.findOne({
          where: {
            personDni: user.dni,
          },
        });
        user = { ...user, doctor };
        user = {
          user: user.dataValues,
          doctor: user.doctor,
        };
      } catch (e) {
        console.log("Error al traer al doctor: ", e);
      }
      //Para traer el perfil de PACIENTE
    } else if (user.rol === "Patient") {
      try {
        let patient = await Patient.findOne({
          where: {
            personDni: user.dni,
          },
        });
        user = { ...user, patient };
        user = {
          user: user.dataValues,
          patient: user.patient,
        };
      } catch (e) {
        console.log("Error al traer al paciente: ", e);
      }
    }
    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

const server = express();

server.name = "API";

// middlewares

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.set("views", __dirname + "/views");
server.set("view engine", "ejs");
server.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// Inicializa Passport y recupera el estado de autenticación de la sesión.
server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// Routes

server.use("/", routes);
server.use("/login", loginRouter);
server.use("/patient", patientRouter);
server.use("/doctor", doctorRouter);
server.use("/specialities", specialitiesRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
