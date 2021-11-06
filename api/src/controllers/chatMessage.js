const SOCKET_CHAT = (io) => {
  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on("join", (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);
    });
    socket.on("chat", (data) => {
      const { message, sender, reciver } = data;
      var listRooms = io.sockets.adapter.rooms;
      console.log("ESTAS DEL CHAT", listRooms);
      console.log(`msg: ${message}, sender: ${sender}, reciver: ${reciver}`);
      io.to(sender).to(reciver).emit("reciveChat", message);
    });
  });
};

module.exports = {
  SOCKET_CHAT,
};
