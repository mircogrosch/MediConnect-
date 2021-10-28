const { Router } = require("express");
const router = Router();
const { createDoctor, getDoctors} = require("../controllers/doctor.controllers");

router.route("/").get(getDoctors);

router.route("/").post(createDoctor);

module.exports = router;
