const { Router } = require("express");
const { emailSend } = require("../controllers/emailSend");
const router = Router();

router.route("/").post(emailSend);

module.exports = router;