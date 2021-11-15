import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";

export default function Signature({ state, setState }) {
  const sigCanvas = useRef({});

  const [imgURL, setImgURL] = useState(null);

  const cleanUp = () => sigCanvas.current.clear();

  const save = () => {
    setImgURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  useEffect(() => {
    setState({
      ...state,
      signature: imgURL,
    });
  }, [imgURL]);

  return (
    <div className="container">
      <Popup
        modal
        trigger={<button className="boton">Agregar firma</button>}
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
            <div className="conteinerBotonSign">
              <button className="botonSign" onClick={close}>
                Cerrar
              </button>
              <button className="botonSign" onClick={cleanUp}>
                Limpiar
              </button>
              <button className="botonSign" onClick={save}>
                Guardar
              </button>
            </div>
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
