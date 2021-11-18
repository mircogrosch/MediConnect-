const { Router } = require("express");
const router = Router();
const {doPayment,paymentFinish} =require("../controllers/mercadopago");

router.route("/").post(doPayment);
router.route("/payment").put(paymentFinish)

module.exports = router; 