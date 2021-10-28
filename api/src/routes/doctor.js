const { Router } = require("express");
const router = Router();
const { createDoctor } = require("../controllers/doctor.controllers");

router.route("/").post(createDoctor);

module.exports = router;
