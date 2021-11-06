import {io} from 'socket.io-client'; 
const URL = "http://localhost:3001"
export const socket = io(URL,{
  path: '/notification'
});

/**
 * 
 * @param {debe ser el usuario logeado} user 
 * @param {la conexion socket} socket 
 * @return {Realiza la conexion socket y envia el evento joinNotifications para crear un canal}
 */
export const socket_Connect=(user,socket)=>{ 
    const sender= user.email;
 socket.on("connection", ()=> { 
    console.log(socket.connected)
}) 
socket.emit('joinNotifications',sender);

}

/**
 * 
 * @param {*userReciver Recibe el user a la cual se le envia la notificacion} 
 * @param {*userSender Recibe el user logeado} 
 * @param {*socket Recibe la conexion socket}
 * @return {Emite un evento sendNotificaiones }
 */
export const send_Notifications= (userReciver,userSender,socket) => {
    console.log("entro")
    socket.emit('sendNotifications',{ 
        message: `${userSender.user.name} te envio una solicitud de amistad`,
        sender:userSender.user.email,
        reciver:userReciver.email,
        idReciver:userReciver.id,
        idSender:userSender.user.dni,
        id_patient:userSender.rol.id
    })
}


/**
 * 
 * @param {Recibe la conexion socket} socket 
 * @param {Recibe dispatch para dispara la accion} dispatch
 * @return {Escucha un evento reciveNotifications, que me trae la información para las notificaciones} 
 */
export const recive_Notifications=(socket,dispatch)=> { 
    socket.on('reciveNotifications', request => {
        dispatch({type:'SAVE_NOTIFICATION',payload:request})
    }) 
}

