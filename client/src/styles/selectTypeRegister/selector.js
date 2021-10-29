import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const useStyles = makeStyles({
  root: {
    height: "100vh",
    background: "linear-gradient(to bottom, #b2dfdb, #4db6ac)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  typography: {
    color: grey[700],
    fontSize: "2.5em",
    fontWeight: "normal",
  },
});
