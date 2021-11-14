const { Router } = require("express");
const router = Router();
const {
  createPrescription,
  getPrescriptions,
} = require("../controllers/prescription.controllers");

/* PARA CREAR UNA RECETA
  Se debe enviar el id del doctor y el id del paciente por query
  ej: (method: POST) http://localhost:3001/prescription?patientId=ID_PACIENTE&doctorId=ID_DOCTOR
*/
router.route("/").post(createPrescription);

/* DEVUELVE TODAS LAS RECETAS EMITIDAS DE UN DOCTOR A UN PACIENTE
  Se debe enviar el id del doctor y el id del paciente por query
  ej: (method: GET)  http://localhost:3001/prescription?patientId=ID_PACIENTE&doctorId=ID_DOCTOR
*/
router.route("/").get(getPrescriptions);

module.exports = router;
