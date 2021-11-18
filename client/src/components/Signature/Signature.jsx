import React, { useRef } from "react";
import { Grid, Button } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SignaturePad from "react-signature-canvas";
import "../../styles/registerForms/sig_canvas.css";

export default function Signature({
  imgURL,
  setImgURL,
  bgColor,
}) {
  const sigCanvas = useRef({});

  const cleanUp = () => sigCanvas.current.clear();
  const save = async () => {
    const b64ToBlob = async (b64) => {
      const blob = await fetch(b64);
      return blob;
    };
    b64ToBlob(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")).then(
      (result) => setImgURL(result.url)
    );
  };

  return (
    <Grid container>
      <Popup
        modal
        trigger={
          <Button variant="contained" sx={{ height: "50px", bgcolor: bgColor }}>
            Agregar firma
          </Button>
        }
        closeOnDocumentClick={false}
      >
        {(close) => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
            />
            <Grid container justifyContent="space-between">
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  width: { md: "30%", xs: "100%" },
                  marginBottom: "0.5em",
                  bgcolor: bgColor,
                }}
                onClick={close}
              >
                Cerrar
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  width: { md: "30%", xs: "100%" },
                  marginBottom: "0.5em",
                  bgcolor: bgColor,
                }}
                onClick={cleanUp}
              >
                Limpiar
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  width: { md: "30%", xs: "100%" },
                  marginBottom: "0.5em",
                  bgcolor: bgColor,
                }}
                onClick={save}
              >
                Guardar
              </Button>
            </Grid>
          </>
        )}
      </Popup>
      {imgURL ? (
        <img src={imgURL} className={"img"} alt="notfound"></img>
      ) : (
        false
      )}
    </Grid>
  );
}
