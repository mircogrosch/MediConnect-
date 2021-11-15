import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
function JitsiMeet({ closeJitsi }) {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const roomId = useSelector((state) => state.messages.conversation);
  const { user } = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  useEffect(() => {
    function startConference() {
      try {
        const domain = "meet.jit.si";
        const options = {
          roomName: roomId,
          height: "100%",
          width: "100%",
          parentNode: document.getElementById("jitsi-container"),
          interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
          },
          configOverwrite: {
            disableSimulcast: false,
          },
          onload: "Loading",
          userInfo: {
            email: user.email,
            displayName: `${user.name} ${user.lastname}`,
          },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.addEventListener("videoConferenceJoined", () => {
          console.log("Local User Joined");
          api.executeCommand("displayName", `${user.name} ${user.lastname}`);
        });
        api.addEventListener("readyToClose", () => {
          closeJitsi();
        });
      } catch (error) {
        console.error("Failed to load Jitsi API", error);
      }
    }
    // verifico si JITSI existe en el objeto globlal
    if (window.JitsiMeetExternalAPI) startConference();
    else alert("Jitsi Meet API script not loaded");
  }, [closeJitsi, roomId, user.email, user.lastname, user.name]);

  return (
    <div style={containerStyle}>
      <div id="jitsi-container" style={containerStyle} />
    </div>
  );
}

export default JitsiMeet;
