import React, { useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";

export default function Signature() {
  const sigCanvas = useRef({});
  const [imgURL, setImgURL] = useState(null);
  const cleanUp = () => sigCanvas.current.clear();
  const save = () =>
    setImgURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  return (
    <div>
      <Popup
        modal
        trigger={<button>Agregar firma</button>}
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
            <button onClick={close}>Cerrar</button>
            <button onClick={cleanUp}>Limpiar</button>
            <button onClick={save}>Guardar</button>
          </>
        )}
      </Popup>
      <br />
      <br />
      {imgURL ? (
        <img src={imgURL} className={"img"} alt="notfound"></img>
      ) : (
        false
      )}
    </div>
  );
}
