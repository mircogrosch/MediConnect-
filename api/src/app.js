const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const loginRouter = require("./routes/login");
const patientRouter = require("./routes/patients");
const doctorRouter = require("./routes/doctor");
const specialitiesRouter = require("./routes/specialities");

require("./db.js");

const server = express();

server.name = "API";

// middlewares

server.use(express.json());
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
