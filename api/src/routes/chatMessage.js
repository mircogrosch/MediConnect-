const { Router } = require("express");
const router = Router();
const {getMessage,getNotificationChat} = require('../controllers/chatMessage')

router.route("/").get(getMessage);
router.route("/notifications").get(getNotificationChat);


module.exports = router; 