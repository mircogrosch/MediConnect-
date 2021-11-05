const {Notification,Doctor} = require('../db.js') 

/**
 * OBTIENE TODAS LAS NOTIFICACIONES RELACIONADAS A UN DOCTOR
 * @param {*} req request de express
 * @param {*} res response de express
 */
const getNotificationById = async (req,res)=> { 
     const {idDoctor} = req.body; 
     const notifications = await Notification.findAll({
       where:{
        idDoctor: idDoctor
       }
     }); 
     res.send(notifications)
}

/**
 * ELIMINA UNA NOTIFICACION ESPECIFICA
 * @param {*} idNotification recibe el id de una notificacion especifica
 */
const deleteNotification = async (idNotification)=> { 
      const notificationToRemove =  await Notification.findOne({
        where:{
          id:idNotification
        }
      })
      console.log(notificationToRemove)
      await notificationToRemove.destroy()

}

/**
 * GUARDA LA NOTIFICACION EN LA BASE DE DATOS
 * @param {*} notification Recibe un objeto notificacion que lo envia socket
 */
const saveNotification = async (notification)=>{ 
      const new_Notification = await Notification.create({
         description: notification.message, 
         idDoctor: notification.idReciver,
         idPatient: notification.id_patient
       },{
         fields:[
           "description",
           "idDoctor",
           "idPatient"
         ]
       }); 
      //busco el personDni del Doctor 
        const doctor = await Doctor.findOne({where: {id: notification.idReciver}})
        new_Notification.setPerson(doctor.dataValues.personDni)

}
/**
 * HACE LA CONEXION SOCKET, ESCUCHA Y EMITE EVENTOS PARA LAS NOTIFICAIONES
 * @param {*} io Recibe una conexion socket
 */
const SOCKET_NOTIFICATION=  (io) => {
    io.on('connection', (socket) => { 
      socket.on('joinNotifications', (sender) => {
        console.log(sender)
        socket.join(sender) 
      })
   
      socket.on('sendNotifications', (request) => {
        saveNotification(request)
        io.to(request.reciver).emit('reciveNotifications', request)
      })
    })
  }





module.exports = { 
  SOCKET_NOTIFICATION,
  getNotificationById,
  deleteNotification

}
