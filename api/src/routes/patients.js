const { Router } = require("express");
const router = Router();
const {
  getPatient,
  getPatients,
  createPatient,
} = require("../controllers/patients.controllers");

router.route("/").get(getPatients);

router.route("/").post(createPatient);

// router.route("/:email").get(getPatient);

module.exports = router;
