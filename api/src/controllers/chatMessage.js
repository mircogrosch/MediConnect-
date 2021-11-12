const { Message, Person, Conversation,Notification } = require("../db.js");
const {conn} = require("../db.js");

const deleteNotificationChat = async (req,res)=>{ 
  const {personDni,type} = req.query;
  try{ 
    const notificationToRemove =  await Notification.findOne({
      where:{
        personDni:personDni,
        type: type
      }
    })
    console.log("NOTI REMOVE", notificationToRemove)
    await notificationToRemove.destroy()
    res.status(200)
  } catch { 
      res.status(400)
  }
 
 
}

/**
 * DEVUELVE LAS NOTIFICACIONES DE ALGUIEN EN PARTICULAR 
 * @param {*} req request de express
 * @param {*} res response de express
 */
 const getNotificationChat = async (req, res)=> { 
      const {dniReciver,type} = req.query
  try{ 
    const notifications = await Notification.findAll({
      where:{
       personDni: dniReciver,
       type: type
      }
    }); 
    res.send(notifications)
   }catch{
     res.status(400).send("NOT FOUND")
   }
 }
/**
 * GUARDA LAS NOTIFICACIONES EN LA DB
 * @param {*} notification recibe una notificacion socket
 */

const saveNotificationChat = async (notification)=> { 
  const new_Notification = await Notification.create(
    {
      description: notification.message,
      idDoctor: notification.idReciver,
      idPatient: notification.id_patient,
      type: notification.type
    },
    {
      fields: ["description", "idDoctor", "idPatient", "type"],
    }
  );
  //busco la persona 
  const person = await Person.findOne({
    where: { dni: notification.dniReciver },
  });
  new_Notification.setPerson(person.dataValues.dni);

}

/**
 * Devuelve los mensajes de una conversacion en particular
 * @param {*} req request de express
 * @param {*} res response de express
 */
const getMessage = async (req, res) => {
  const { dniSender, dniReciver } = req.query;
  console.log("SENDER",dniSender,"RECIVER",dniReciver)
  try {
     const personSender = await Person.findOne({
          where: {
             dni: dniSender
          }
     });
     const personReciver= await Person.findOne({
       where: { 
         dni: dniReciver
       }
     }) 
     const conversationSender = await personSender.getConversations()
     const conversationReciver = await personReciver.getConversations()
     let idConversationMatch= null; 
    for(let i=0; i<conversationSender.length; i++){ 
        for(let j=0; j<conversationReciver.length;j++){
          if(conversationSender[i].dataValues.id === conversationReciver[j].dataValues.id){ 
             idConversationMatch = conversationSender[i].dataValues.id; 
          } 
        }
    }

    //buscar todas las conversaciones con el dni de la persona. 
   const conversationMatch = await Conversation.findOne({
      where:{ 
        id: idConversationMatch
      }
    })
    console.log("ESTA ES LA CONVERSACION", conversationMatch)
    const messages = await conversationMatch.getMessages();
    console.log("ESTOS SON LOS MENSAJES", messages)
    res.json({
      data: messages,
      status: 200,
    });
  } catch(error){
      res.status(400).send(error)
  }
};

/**
 * GUARDA LOS MENSAJES EN LA DB
 * @param {*} dataMessage recibe un mensaje enviado por socket
 */
const saveMessage = async (dataMessage) => {
  const newMessage = await Message.create({
    text: dataMessage.message,
  });

  const personSender = await Person.findOne({
    where: {
      email: dataMessage.sender,
    },
  });
  const personReciver = await Person.findOne({
    where: {
      email: dataMessage.reciver,
    },
  });
  const conversationSender = await personSender.getConversations()
  const conversationReciver = await personReciver.getConversations()
  let idConversationMatch= null; 
 for(let i=0; i<conversationSender.length; i++){ 
     for(let j=0; j<conversationReciver.length;j++){
       if(conversationSender[i].dataValues.id === conversationReciver[j].dataValues.id){ 
          idConversationMatch = conversationSender[i].dataValues.id; 
       } 
     }
 }

 //buscar todas las conversaciones con el dni de la persona. 
const conversationMatch = await Conversation.findOne({
   where:{ 
     id: idConversationMatch
   }
 })
  await newMessage.setConversation(conversationMatch);
  await newMessage.setPerson([personSender.dataValues.dni]);
};

/**
 * REALIZA LA CONEXIÓN CON EL CHAT Y ESCUCHA EVENTOS CORRESPONDIENTES
 * @param {*} io Recibe una conexión socket con path /messages
 */
const SOCKET_CHAT = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
    });
    socket.on("chat", (data) => {
      const { sender, reciver } = data;
      saveMessage(data);

      const newNotificationChat = { 
        message: `${sender} envio un mensaje`,
        idReciver: data.idReciver,
        id_patient: data.id_patient,
        type: data.type,
        dniReciver: data.dniReciver
      }
      io.to(reciver).emit("reciveNotificationChat",newNotificationChat);
      saveNotificationChat(newNotificationChat)
      io.to(sender).to(reciver).emit("reciveChat", data);
    });
  });
};

module.exports = {
  SOCKET_CHAT,
  getMessage,
  getNotificationChat,
  deleteNotificationChat
};
