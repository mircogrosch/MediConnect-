const { Notification, Doctor } = require("../db.js");

/**
 * OBTIENE TODAS LAS NOTIFICACIONES RELACIONADAS A UN DOCTOR
 * @param {*} req request de express
 * @param {*} res response de express
 */

const getNotificationById = async (req,res)=> { 
     const {idDoctor,type} = req.query; 
     try{ 
      const notifications = await Notification.findAll({
        where:{
         idDoctor: idDoctor,
         type: type
        },
       //  attributes: ['id', 'idDoctor', 'idPatient', 'description', 'personDni']
      }); 
      res.send(notifications)
     }catch{
       res.status(400).send("NOT FOUND")
     }
    
}

/**
 * ELIMINA UNA NOTIFICACION ESPECIFICA
 * @param {*} idNotification recibe el id de una notificacion especifica
 */

const deleteNotification = async (idPatient)=> { 
      const notificationToRemove =  await Notification.findOne({
        where:{
          idPatient:idPatient
        }
      })
      await notificationToRemove.destroy()

}

/**
 * GUARDA LA NOTIFICACION EN LA BASE DE DATOS
 * @param {*} notification Recibe un objeto notificacion que lo envia socket
 */
const saveNotification = async (notification) => {
  const new_Notification = await Notification.create(
    {
      description: notification.message,
      idDoctor: notification.idReciver,
      idPatient: notification.id_patient,
      type: notification.type
    },
    {
      fields: ["description", "idDoctor", "idPatient","type"],
    }
  );
  //busco el personDni del Doctor
  const doctor = await Doctor.findOne({
    where: { id: notification.idReciver },
  });
  new_Notification.setPerson(doctor.dataValues.personDni);
};
/**
 * HACE LA CONEXION SOCKET, ESCUCHA Y EMITE EVENTOS PARA LAS NOTIFICAIONES Y CHAT
 * @param {*} io Recibe una conexion socket
 */
const SOCKET_NOTIFICATION = (io) => {
  io.on("connection", (socket) => {
    //CONEXION NOTIFICACIONES Y CHAT
    socket.on("joinNotifications", (sender) => {
      console.log(sender);
      socket.join(sender);
      var listRooms= io.sockets.adapter.rooms;
      console.log("Estas del JOIN",listRooms)
    });
   
    socket.on("sendNotifications", (request) => {
      saveNotification(request);
      io.to(request.reciver).emit("reciveNotifications", request);
    });

    //RECIBE MENSAJES Y LOS EMITE
   
    //DESCONEXION SOCKET
    // socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
  });
};

module.exports = {
  SOCKET_NOTIFICATION,
  getNotificationById,
  deleteNotification,
};
