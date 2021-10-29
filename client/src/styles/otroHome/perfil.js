import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@mui/material/colors";

export const useStyles = makeStyles({
  root: {
    width: "30vw",
    height: "75vh",
    padding: "2em 1em",
    textAlign: "center",
    backgroundColor: "#b2dfdb",
    borderRadius: "5px",
    position: "relative",
  },
  circleUser: {
    margin: "2em auto",
    width: "50%",
  },
  body: {
    marginTop: "1.5em",
    padding: "1em",
    backgroundColor: teal[200],
    borderRadius: "5px",
  },
  name: {
    color: teal[800],
    fontSize: "1.4em",
  },
});
