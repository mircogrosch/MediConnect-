const { Router } = require("express");
const router = Router();
const getLogin = require("../controllers/login.controllers");

router.route("/").post(getLogin);

module.exports = router;
