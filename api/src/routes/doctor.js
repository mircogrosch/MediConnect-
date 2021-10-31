const { Router } = require("express");
const router = Router();
const { createDoctor, getDoctor, getDoctors, getPatient, getPatients} = require("../controllers/doctor.controllers");


router.route("/").get(getDoctors);

router.route("/").post(createDoctor);

/*
Se envia el nombre del paciente y el id del Doctor mediante query
ej: localhost:3001/doctor/patient?name=Robert&id=id_doctor
*/
router.route("/patient").get(getPatient);

/*
Para traer todos los Pacientes de la lista de Pacientes de un Doctor
Se envia por params el id del Doctor
*/
router.route("/patients/:id").get(getPatients);

router.route("/:id").get(getDoctor);

module.exports = router;
