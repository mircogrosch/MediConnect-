import { IconButton } from "@material-ui/core";
import ForwardIcon from "@mui/icons-material/Forward";

const ButtonFoward = ({ obj, setDoctorData, nextStep }) => {
  const onClick = () => {
    setDoctorData(obj);
    nextStep();
  };
  return (
    <>
      {obj.work_days.length ? (
        <IconButton aria-label="delete" size="small" onClick={() => onClick()}>
          <ForwardIcon fontSize="large" />
        </IconButton>
      ) : (
        false
      )}
    </>
  );
};
export default ButtonFoward;
