module.exports = (io) => {
    io.on('connection', (socket) => { //on escucha emmit emite 
      socket.on('joinNotifications', (sender) => {
        //email de una persona socket.id
        socket.join(sender)  //me creearia una sala para cada usuario 
      })
  
      socket.on('sendNotifications', (request) => {
        io.to(request.reciver).emit('reciveNotifications', request)
      })
    })
  }