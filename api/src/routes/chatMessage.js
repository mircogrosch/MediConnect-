const { Router } = require("express");
const router = Router();
const {getMessage} = require('../controllers/chatMessage')

router.route("/").get(getMessage);



module.exports = router; 