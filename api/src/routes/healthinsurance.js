const { Router } = require("express");
const router = Router();
const { getHealthinsurance } = require("../controllers/healthinsurance.controllers");

router.route("/").get(getHealthinsurance);

module.exports = router;