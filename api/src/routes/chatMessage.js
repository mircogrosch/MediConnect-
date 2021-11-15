const { Router } = require("express");
const router = Router();
const {getMessage,getNotificationChat,deleteNotificationChat,getConversation} = require('../controllers/chatMessage')

router.route("/").get(getMessage);
router.route("/notifications").get(getNotificationChat);
router.route("/notifications/delete").delete(deleteNotificationChat);
router.route("/conversation").get(getConversation);
module.exports = router; 