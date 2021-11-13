import React, {useEffect } from 'react';
import {useSelector} from 'react-redux'
function JitsiMeet({closeJitsi}) {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

const roomId = useSelector(state => state.messages.conversation);

 function startConference() {
  try {
   const domain = 'meet.jit.si';
   const options = {
    roomName: roomId,
    height: "100%",
    width:"100%",
    parentNode: document.getElementById('jitsi-container'),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {
     disableSimulcast: false,
    },
    onload:"Loading"
   };

   const api = new window.JitsiMeetExternalAPI(domain, options);
   api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    api.executeCommand('displayName', 'MyName');
   });
   api.addEventListener('readyToClose', ()=>{
      closeJitsi()
   })
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  }
 }

 useEffect(() => {
  // verifico si JITSI existe en el objeto globlal 
  if (window.JitsiMeetExternalAPI) startConference();
  else alert('Jitsi Meet API script not loaded');
 }, []);

 return (
  <div
   style={containerStyle}
  >
   <div
    id="jitsi-container"
    style={containerStyle}
   />
  </div>
 );
}

export default JitsiMeet;