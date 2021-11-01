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
    const [numberNotification, setNotification] = useState(0)
    const notifications = useSelector(state=> state.notification.notifications)
    const dispatch = useDispatch()

    //coneccion socket 
    socket.on("connection", ()=> { 
        console.log(socket.connected)
        sessionStorage.setItem('user_id',socket.id)
    }) 
        const sender= sessionStorage.getItem('user_id')
     //emito evento para capturarlo desde back
    socket.emit('joinNotifications',sender);

    
    // recibo notificacion
    socket.on('reciveNotifications', request => {
        dispatch({type:'SAVE_NOTIFICATION',payload:request})
        let number = notifications.length
        setNotification(number)
    }) 
    //envia notificación 
    const actionOnRequest= (button) => 
            socket.emit('sendNotifications',{ 
                message: `Esta es la notificacion del boton: ${button}`,
                sender:sessionStorage.getItem('user_id'),
                reciver:sessionStorage.getItem('user_id')
            })
   
    console.log(numberNotification)
    return (

        <div>
            <PrimarySearchAppBar numberNoti={numberNotification} />
            
            <Button onClick={()=>actionOnRequest('button 1')}> 
                Enviar Notificacion
            </Button>
        </div>
    )
}

export default Container
