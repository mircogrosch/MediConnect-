const { Message, Person, Conversation,Notification } = require("../db.js");



 const getNotificationChat = async (req, res)=> { 
      const {dniReciver,type} = req.query
  try{ 
    const notifications = await Notification.findAll({
      where:{
       personDni: dniReciver,
       type: type
      },
     //  attributes: ['id', 'idDoctor', 'idPatient', 'description', 'personDni']
    }); 
    res.send(notifications)
   }catch{
     res.status(400).send("NOT FOUND")
   }
 }


const saveNotificationChat = async (notification)=> { 
  const new_Notification = await Notification.create(
    {
      description: notification.message,
      idDoctor: notification.idReciver,
      idPatient: notification.id_patient,
      type: notification.type
    },
    {
      fields: ["description", "idDoctor", "idPatient"],
    }
  );
  //busco la persona 
  const person = await Person.findOne({
    where: { id: notification.dniReciver },
  });
  new_Notification.setPerson(person.dataValues.dni);

}
const getMessage = async (req, res) => {
  const { dniSender, dniReciver } = req.query;
  try {
    const conversation = await Conversation.findOne({
      include: [
        {
          model: Person,
          where: {
            dni: dniSender,
          },
        },
        {
          model: Person,
          where: {
            dni: dniReciver,
          },
        },
      ],
    });
    const messages = await conversation.getMessages();

    res.json({
      data: messages,
      status: 200,
    });
  } catch(error){
      res.status(400).send(error)
  }
};
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
  const conversation = await Conversation.findOne({
    include: [
      {
        model: Person,
        where: {
          dni: personSender.dataValues.dni,
        },
      },
      {
        model: Person,
        where: {
          dni: personReciver.dataValues.dni,
        },
      },
    ],
  });
  await newMessage.setConversation(conversation);
  await newMessage.setPerson([personSender.dataValues.dni])
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
  getNotificationChat
};
