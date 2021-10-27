const { Router } = require("express");
const router = Router();
const getLogin = require("../controllers/login.controllers");

router.route("/").get(getLogin);

module.exports = router;
