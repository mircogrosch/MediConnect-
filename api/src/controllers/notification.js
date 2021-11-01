module.exports = (io) => {
    io.on('connection', (socket) => {
      socket.on('joinNotifications', (sender) => {
        console.log(sender)
        socket.join(sender)
      })
  
      socket.on('sendNotifications', (request) => {
        io.to(request.reciver).emit('reciveNotifications', request)
      })
    })
  }