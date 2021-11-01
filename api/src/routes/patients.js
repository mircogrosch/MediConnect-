const { Router } = require("express");
const router = Router();
const {
  getPatient,
  getPatients,
  createPatient,
  getDoctor,
  getDoctors,
  addDoctor
} = require("../controllers/patients.controllers");


router.route("/").get(getPatients);

router.route("/").post(createPatient);

/*
Para traer todos los Doctores del Paciente, dado el nombre del Doctor
Se envia el nombre del Doctor y el id del Paciente mediante query
ej: localhost:3001/patient/doctor?name=Robert&id=id_paciente
*/
router.route("/doctor").get(getDoctor);

/*
Para traer todos los Doctores de la lista de Doctores de un Paciente
Se envia por params el id del Paciente
*/
router.route("/doctors/:id").get(getDoctors);

/*
Para agregar un Doctor a lista de Doctores de un Paciente
Se envia por params el id del Paciente
Y se envia por body el id del Doctor
*/
router.route("/doctors/:id").post(addDoctor);


router.route("/:id").get(getPatient);


module.exports = router;
