const { Router } = require("express");
const router = Router();
const {
  getPatient,
  getPatients,
  createPatient,
  getDoctors,
  addDoctor
} = require("../controllers/patients.controllers");

router.route("/:id").get(getPatient);

router.route("/").get(getPatients);

router.route("/").post(createPatient);

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




module.exports = router;
