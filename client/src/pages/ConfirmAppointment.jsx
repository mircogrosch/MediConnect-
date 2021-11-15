import React from 'react';
import {useHistory} from 'react-router-dom'
import {Typography,Grid,Box,Button} from '@mui/material'
import {teal} from "@mui/material/colors"
import jwt from "jsonwebtoken";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import swal from 'sweetalert';
const  ConfirmAppointment = ()=> {
const {user,rol} = jwt.verify(
        JSON.parse(sessionStorage.getItem("user"))?.token,
        "secret"
      );
const history = useHistory()

const handleClick = ()=> { 
    swal("Su turno se registro con exito,¿Que quieres hacer?",{
        buttons:{
            catch:{
                text:"Terminar",
                value:"catch"
            },
            defeat:{
                text:"Reservar otro turno",
                value:"other"
            }
        }
    }).then((value)=>{
        switch(value){
            case "catch":
              return  history.push('/account/patient');
            case "defeat":{
               return  history.push(`/account/patient/new-appointment/${rol.id}`);
            }
        }
    })
}



    return (
        <div> 
            <PrimarySearchAppBar bgColor={teal[900]} color={teal[50]} />
        <Grid container rowSpacing={10} 
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        style={{backgroundColor:teal[100],height:"100vh",maxHeight:"100vh",marginTop:1}}
        >
             <Grid item > 
                <Typography variant="h1" fontSize="2.5em" style={{fontWeight:100}}> 
                    {`Por favor ${user.name} ,confirme su turno`}
                </Typography>
             </Grid>
             <Grid item > 
                 <Typography variant="h6" style={{color:teal[900]}}>
                     {`${user.name} estas a punto de reservar un turno con el Dr/a NOMBRE DOCTOR el dia FECHA a las HORA`}
                 </Typography>
             </Grid>
             <Grid item container flexDirection="column" alignItems="center"> 
                <Box style={{width:"50%", display:"flex",justifyContent:"space-evenly"}}> 
                    <Button variant="contained" style={{backgroundColor:teal[900]}}>
                        Cancelar
                     </Button>
                     <Button variant="contained"  style={{backgroundColor:teal[900]}} onClick={()=>handleClick()}> 
                         Reservar
                     </Button>
                </Box>
             </Grid>
        </Grid>
        </div>
    )
}

export default ConfirmAppointment
