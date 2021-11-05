module.exports = (io) => {
    io.on('connection', (socket) => { //on escucha emmit emite 
      socket.on('joinNotifications', (sender) => {
        //email de una persona socket.id
        console.log(sender)
        socket.join(sender)  //me creearia una sala para cada usuario 
      })
   
      socket.on('sendNotifications', (request) => {
        console.log(request)
        io.to(request.reciver).emit('reciveNotifications', request)
      })
    })
  }