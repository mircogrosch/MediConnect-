import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@mui/material/colors";

export const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    paddingY: "1em",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  title: {
    color: grey[700],
    marginBottom: ".5em",
  },
  input: {
    borderBottomColor: "green",
    width: "500px",
  },
  button: {
    width: "100%",
    height: "50px",
  },
});
