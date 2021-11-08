const { Message, Person, Conversation } = require("../db.js");

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
    console.log(`Connected: ${socket.id}`);
    socket.on("join", (room) => {
      socket.join(room);
    });
    socket.on("chat", (data) => {
      const { message, sender, reciver } = data;
      saveMessage(data);
      io.to(sender).to(reciver).emit("reciveChat", data);
    });
  });
};

module.exports = {
  SOCKET_CHAT,
  getMessage
};
