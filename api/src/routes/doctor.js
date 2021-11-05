const { Router } = require("express");
const router = Router();
const {
  createDoctor,
  getDoctor,
  getDoctors,
  getPatient,
  getPatients,
} = require("../controllers/doctor.controllers");





/*
opcion 1:   
  method: GET
  http://localhost:3001/doctor?dni=999
  Devuelve todos los Doctores que NOO esten relacionados al Paciente
  DNI de paciente enviado por query
opcion 2:
  method: GET
  http://localhost:3001/doctor
  Devuelve todos los Doctores en la Base de Datos
opcion 3:
  method: GET
  http://localhost:3001/doctor?dni=999&name=Victor
  Devuelve todos los Doctores que NOO esten relacionados al Paciente, y que coincidan con un Nombre
  DNI de paciente enviado por query
  NAME de Doctor enviado por query
*/
router.route("/").get(getDoctors);

router.route("/").post(createDoctor);

/*
Para traer todos los Pacientes del Doctor, dado el nombre del Paciente
Se envia el nombre del paciente y el dni del Doctor mediante query
ej: localhost:3001/doctor/patient?name=Robert&id=id_doctor
*/
router.route("/patient").get(getPatient);

/*
Para traer todos los Pacientes de la lista de Pacientes de un Doctor
Se envia por params el DNI del Doctor
ej: localhost:3001/doctor/patients/id_doctor
*/
router.route("/patients/:dni").get(getPatients);

router.route("/:id").get(getDoctor);

module.exports = router;
