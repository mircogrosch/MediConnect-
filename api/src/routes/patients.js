const { Router } = require("express");
const router = Router();
const {
  getPatient,
  getPatients,
  createPatient,
  getDoctors,
  addDoctor,
  deleteDoctor,
} = require("../controllers/patients.controllers");

router.route("/").get(getPatients);

router.route("/").post(createPatient);

/*
Para traer todos los Doctores del Paciente, dado el nombre del Doctor
Se envia el nombre del Doctor y el dni del Paciente mediante query
ej: localhost:3001/patient/doctor?name=Robert&id=id_paciente
*/
router.route("/doctor").get(getDoctor);

/*
Para traer todos los Doctores de la lista de Doctores de un Paciente
Se envia por params el dni del Paciente
ej: localhost:3001/patient/doctors/id_paciente
*/
router.route("/doctors/:dni").get(getDoctors);

/*
Para agregar un Doctor a lista de Doctores de un Paciente
Se envia por params el id del Paciente
Y se envia por body el id del Doctor body -> id_Doctor
ej: localhost:3001/patient/doctors/id_paciente
*/
router.route("/doctors/:id").post(addDoctor);
/*
Para eliminar un Doctor a lista de Doctores de un Paciente
Se envia por params el id del Paciente
Y se envia por query el id del Doctor
ej: localhost:3001/patient/doctors/:id_paciente?id_Doctor=Mauricio
*/
router.route("/doctors/:id").delete(deleteDoctor);

router.route("/:id").get(getPatient);

module.exports = router;
