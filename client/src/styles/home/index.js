import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@mui/material/colors";

export const useStyles = makeStyles({
  root: {
    height: "100vh",
    background: teal[50],
  },
  container: {
    height: "90vh",
    margin: "0 1em",
    alignItems: "flex-end",
    display: "flex",
  },
});
