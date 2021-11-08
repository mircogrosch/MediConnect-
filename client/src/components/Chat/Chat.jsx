import React, {useEffect, useState} from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import { InputBase, Typography } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { AccountCircle, Send } from '@mui/icons-material'
import { Box } from '@mui/system'
import { teal } from '@material-ui/core/colors'
import jwt from "jsonwebtoken";
import {initiateSocketChat,
    sendMessage,socketChat} from '../Controlers/chatMessage'

const MyBox = styled(Box)({
    backgroundColor: teal[200],
    borderRadius:'5px',
    display:'flex',
    alignItems:'center',
    // marginTop:'11px'
})

const MyGrid = styled(Grid)({
    backgroundColor: teal[100],
    borderRadius:'5px',
    display: 'flex',
    flexDirection:'column',
    marginRight:'20px',
    marginTop:'30px',
    height: '82vh',
    padding:'5px',
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)"
})
const MyTextInput = styled(InputBase)({
    border: '1px solid #bdbdbd',
    borderRadius: '5px',
    backgroundColor: 'white',
    height:'45px',
    padding:'3px'
})
const MyIcon = styled(AccountCircle)({
    width:'50px',
    height:'50px',
    marginRight:'5px',
    marginLeft:'10px'
})

function Chat({user}) { 

    const userSender = jwt.verify(
        JSON.parse(sessionStorage.getItem("user"))?.token,
        "secret"
      );

      const [chat, setChat] = useState([]);
      const [message, setMessage] = useState("");

    useEffect(()=>{
        initiateSocketChat(userSender.user,socketChat)
    },[])

    socketChat.on('reciveChat', (data) => {
        console.log(data)
        setChat([...chat,data])
    }) 

    console.log('sender',chat)

    const handleSubmit = () => {
        sendMessage(userSender.user, user.selectContact, message, socketChat)
        setMessage('')
        console.log('hola',chat)
    }
    return (
        <MyGrid>
            <MyBox sx={{ whidth:700, height:75, marginBottom:'10px'}}>
            {user.selectContact ? (
            <MyIcon/>&&<img
              src={user.selectContact.imageProfile}
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
                minWidth: "50px",
                minHeight: "50px",
                borderRadius: "50%",
                marginRight:'5px',
                marginLeft:'10px'
              }}
            />
        ) : (
            null
        )}
                <Typography variant='h5'>{user.selectContact ? `${user.selectContact.name} ${user.selectContact.lastname}`: ''}</Typography>
            </MyBox>
            <Box sx={{ width:'100%', height:500, maxHeight:500}}>
                    { chat.map((m,i) => 
                    <Box>
                        {(m.reciver !== user.selectContact.email) ?
                        (<Box sx={{display:'flex', flexDirection:'column'}}>
                            <Box sx={{bgcolor: teal[400],padding:'3px',margin:'5px', width:'200px', borderRadius:'5px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                <Typography variant='subtitle2'><b>{user.selectContact ? `${user.selectContact.name} ${user.selectContact.lastname}`: ''}</b></Typography>
                                <Typography variant='subtitle1' key={i}>{m.message}</Typography>
                            </Box>
                        </Box>) : 
                        (<Box sx={{display:'flex', alignItems:'flex-end', flexDirection:'column'}}>                            
                            <Box sx={{bgcolor: teal[200],padding:'3px',margin:'5px', width:'200px', borderRadius:'5px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                                <Typography variant='subtitle2'><b>Tu</b></Typography>
                                <Typography variant='subtitle1' key={i}>{m.message}</Typography>
                            </Box>
                        </Box>)}
                    
                    </Box>) }    
            </Box>
            {user.selectContact ? (<MyTextInput value={message}onChange={e => setMessage(e.target.value)}
            placeholder='Escriba su mensaje...'
            endAdornment={ 
                <IconButton 
                onClick = {() => {handleSubmit()}}
                >
                    <Send color='primary'/>
                </IconButton>
            }/>): (<MyTextInput onChange={e => setMessage(e.target.value)}
            placeholder='Escriba su mensaje...'
            value={message}
            endAdornment={ 
                <IconButton onClick = {() => {handleSubmit()}}>
                    <Send color='primary'/>
                </IconButton>
            }/>)}
            
        </MyGrid>
    )
}

export default Chat
