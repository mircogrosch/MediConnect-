const { Router } = require("express");
const router = Router();
const { createDoctor, getDoctor, getDoctors, getPatients} = require("../controllers/doctor.controllers");

router.route("/:id").get(getDoctor);

router.route("/").get(getDoctors);

router.route("/").post(createDoctor);

/*
Para traer todos los Pacientes de la lista de Pacientes de un Doctor
Se envia por params el id del Doctor
*/
router.route("/patients/:id").get(getPatients);

module.exports = router;
