const { Router } = require("express");
const router = Router();
const {
  getPatient,
  getPatients,
  createPatient,
  getDoctors,
} = require("../controllers/patients.controllers");

router.route("/").get(getPatients);

router.route("/doctors/:id").get(getDoctors);

router.route("/").post(createPatient);


module.exports = router;
