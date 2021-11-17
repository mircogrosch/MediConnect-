import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import { deleteDoctor } from "../../actions/index";
import { useDispatch } from "react-redux";

const ButtonRemove = ({ idPatient, idDoctor, aux, setAux }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    swal("Vas a eliminar un doctor de tus contactos, ¿estás seguro? ", {
      dangerMode: true,
      buttons: { cancel: true, confirm: "Continuar" },
    })
      .then((res) =>
        res ? dispatch(deleteDoctor(idPatient, idDoctor)) : false
      )
      .then((ok) => (ok ? setAux(aux + 1) : false));
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="delete" size="small">
        <DeleteIcon fontSize="large" />
      </IconButton>
    </>
  );
};
export default ButtonRemove;
