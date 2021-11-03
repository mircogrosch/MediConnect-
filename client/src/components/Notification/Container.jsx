import React, {useState} from 'react'
import PrimarySearchAppBar from './AppBarNoti.jsx'
import { Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
function Container() { 
   
  
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
