import React, {useState} from 'react'
import {io} from 'socket.io-client'; 
import PrimarySearchAppBar from './AppBarNoti.jsx'
import { Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
const URL = "http://localhost:3001"
const socket = io(URL,{
    path: '/notification'
});
function Container() { 
    const dispatch = useDispatch()

    //coneccion socket 
    socket.on("connection", ()=> { 
        console.log(socket.connected)
        sessionStorage.setItem('user_id',socket.id)
    }) 
        const sender= sessionStorage.getItem('user_id')  //sender = emisor
     //emito evento para capturarlo desde back
    socket.emit('joinNotifications',sender);

    
    // recibo notificacion
    socket.on('reciveNotifications', request => {
        dispatch({type:'SAVE_NOTIFICATION',payload:request})
    }) 
    //envia notificación 
    const actionOnRequest= (userName) => 
            socket.emit('sendNotifications',{ 
                message: `${userName} te envio una solicitud de amistad`,
                sender:sessionStorage.getItem('user_id'),
                reciver:sessionStorage.getItem('user_id')
            })

    return (

        <div>
            <PrimarySearchAppBar />
            
            <Button onClick={()=>actionOnRequest('button 1')}> 
                Enviar Notificacion
            </Button>
        </div>
    )
}

export default Container
