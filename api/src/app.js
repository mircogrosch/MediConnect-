const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const loginRouter = require("./routes/login");
const patientRouter = require("./routes/patients");
const doctorRouter = require("./routes/doctor");
let { Person, Patient, Doctor } = require("./db");
let passport = require("passport");
let Strategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const specialitiesRouter = require("./routes/specialities");
const healthinsuranceRouter = require("./routes/healthinsurance");

require("./db.js");

//Para poder comparar con la password encrypt
function comparePassword(password, passwordDB) {
  return bcryptjs.compareSync(password, passwordDB);
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

        console.log("USUARIO", user);
        user = user.dataValues;
        if (user !== null) {
          //Si existe user con ese email

          if (comparePassword(password, user.password)) {
            //Si coincide password ingresada con la registrada del usuario
            //Para traer el perfil de DOCTOR
            let DNI = user.dni;
            if (user.rol === "Doctor") {
              try {
                let doctor = await Doctor.findOne({
                  where: {
                    personDni: DNI,
                  },
                });
                user = { ...user, doctor };
                user.doctor = user.doctor.dataValues;
              } catch (e) {
                console.log("Error al traer al doctor: ", e);
              }
              //Para traer el perfil de PACIENTE
            } else if (user.rol === "Patient") {
              try {
                let patient = await Patient.findOne({
                  where: {
                    personDni: DNI,
                  },
                });
                user = { ...user, patient };
                user.patient = user.patient.dataValues;
              } catch (e) {
                console.log("Error al traer al paciente: ", e);
              }
            }
            // res.status(200).send({
            //   data: user,
            //   message: "Logged user",
            // });
            return done(null, user);
          } else {
            //Se encontro usera, pero password es incorrecta
            // res.status(200).send({ message: "Incorrect password" });
            return done(null, false, { message: "Incorrect password" });
          }
        } else {
          //No se encontro usera con email ingresado
          // res.status(200).send({ message: "There is no such registered email" });
          return done(null, false, {
            message: "There is no such registered email",
          });
        }
      } catch (error) {
        // res.status(400).send("Error desde base de datos: ", e);
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user.dni);
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
        user.doctor = user.doctor.dataValues;
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
        user.patient = user.patient.dataValues;
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
server.use(cookieParser("secret"));
server.use(morgan("dev"));
server.use(
  session({
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
// Routes

// server.get("/login", (req, res) => {
//   console.log("Soy home!", req.user);
// });
// server.get("/login/fail", (req, res) => {
//   console.log("Soy login!", req.user);
// });
// server.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/login",
//     failureRedirect: "/login/fail",
//   })
// );
server.use("/", routes);
server.use("/login", loginRouter);
server.use("/patient", patientRouter);
server.use("/doctor", doctorRouter);
server.use("/specialities", specialitiesRouter);
server.use("/healthinsurance", healthinsuranceRouter);
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
