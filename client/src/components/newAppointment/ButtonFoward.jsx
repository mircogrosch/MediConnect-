import { IconButton } from "@material-ui/core";
import ForwardIcon from "@mui/icons-material/Forward";
import { Link } from "react-router-dom";

const ButtonFoward = ({ obj }) => {
  return (
    <>
      <Link
        to={{
          pathname: "/account/patient/new-appointment/2/" + obj.idPatient,
          state: { data: obj },
        }}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <IconButton aria-label="delete" size="small">
          <ForwardIcon fontSize="large" />
        </IconButton>
      </Link>
    </>
  );
};
export default ButtonFoward;
