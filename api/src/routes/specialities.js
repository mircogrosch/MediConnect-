const { Router } = require("express");
const router = Router();
const { getSpecialities } = require("../controllers/specialities.controllers");

router.route("/").get(getSpecialities);

module.exports = router;
