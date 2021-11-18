const { Router } = require("express");
const router = Router();

const {
    getDoctors,
    getDoctor,
    getAppointment,
  } = require("../controllers/doctor.controllers"),
  { getPatients, getPatient } = require("../controllers/patients.controllers"),
  { createAdmin, disablePerson } = require("../controllers/admin.controllers");

router.route("/").post(createAdmin);

router.route("/person").delete(disablePerson);

router.route("/patient/:id").get(getPatient);

router.route("/patients").get(getPatients);

router.route("/doctor/:id").get(getDoctor);

router.route("/doctors").get(getDoctors);

/*
  Devuelve todos los turnos pendientes de un Doctor
  fecha - hora - estado de pago - datos paciente
  Se envia id_doctor por params
  ej: (method: GET) localhost:3001/doctor/appointment/id_doctor
*/
router.route("/appointments/:id").get(getAppointment);

module.exports = router;
