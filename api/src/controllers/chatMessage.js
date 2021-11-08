const {Message,Person,Conversation} = require('../db.js')

const saveMessage = async (dataMessage)=> {
 const newMessage= await Message.create({
   text:dataMessage.message}); 

   //busca la persona
   const personSender = await Person.findOne({
     where:{ 
       email: dataMessage.sender,
     }
   }); 
   const personReciver = await Person.findOne({
     where:{
       email: dataMessage.reciver
     }
   }); 
    const conversation = await Conversation.findOne({
        include: [
          {
            model:Person,
            where: { 
              dni: personSender.dataValues.dni
            }
          },
          {
            model:Person,
            where: { 
              dni: personReciver.dataValues.dni
            }
          }
        ]
    }); 
    await newMessage.setConversation(conversation)   
}

const SOCKET_CHAT = (io) => {
  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on("join", (room) => {
      socket.join(room);
    });
    socket.on("chat", (data) => {
      const { message, sender, reciver } = data;
      saveMessage(data)
      io.to(sender).to(reciver).emit("reciveChat", data);
    });
  });
};

module.exports = {
  SOCKET_CHAT,
};
