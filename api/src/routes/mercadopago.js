const { Router } = require("express");
const router = Router();
const {doPayment} =require("../controllers/mercadopago");

router.route("/").get(doPayment);

module.exports = router; 