import React, { useEffect, useState } from "react";
import {
  initiateSocketChat,
  sendMessage,
} from "./Controlers/chatMessage";
import {socketChat} from './Controlers/chatMessage'
import jwt from "jsonwebtoken";

const PruebaChat = () => {
    const {user} = jwt.verify(
        JSON.parse(sessionStorage.getItem("user"))?.token,
        "secret"
      );
  const room = user.email    
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
      
    useEffect(()=>{
        initiateSocketChat(user.email,socketChat)
    },[])
  socketChat.on('reciveChat', (message) => {
    setChat([...chat,message])
}) 

      
  return(
    <div>      
    <h1>Room: {room}</h1>
    <h1>Live Chat:</h1>
    <input type="text" name="name" value={message}
      onChange={e => setMessage(e.target.value)} />
    <button onClick={()=> sendMessage(user,message,socketChat)}>Send</button>
    { chat.map((m,i) => <p key={i}>{m}</p>) }
    </div>
  )
}
export default PruebaChat;
