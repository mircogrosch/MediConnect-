const { Router } = require("express");
const router = Router();
const {getNotificationById,deleteNotification} = require('../controllers/notification')
router.route("/").get(getNotificationById);
router.put("/reject",(req,res)=>{
    const {idPatient} = req.body;
    deleteNotification(idPatient);
    res.status(200)
})






module.exports = router; 