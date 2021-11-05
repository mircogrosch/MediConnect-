import { makeStyles } from "@material-ui/core/styles";
import { teal, grey } from "@mui/material/colors";

export const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    paddingY: "1em",
    background: teal[50],
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  title: {
    color: grey[700],
    marginBottom: ".5em",
  },
  button: {
    width: "100%",
    height: "50px",
  },
});
