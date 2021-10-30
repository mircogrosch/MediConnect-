import { makeStyles } from "@material-ui/core/styles";
import { teal, grey } from "@mui/material/colors";

export const useStyles = makeStyles({
  root: {
    padding: "1em",
    textAlign: "center",
    backgroundColor: "#b2dfdb",
    borderRadius: 12,
    position: "relative",
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)",
  },
  circleUser: {
    margin: "auto",
    width: 150,
    height: 150,
  },
  cardInfo: {
    padding: "1em",
    backgroundColor: teal[200],
    borderRadius: "5px",
  },
  textName: {
    fontSize: "1.4em",
    color: teal[800],
    textAlign: "center",
  },
  icon: {
    color: teal[900],
  },
  text: {
    color: grey[700],
  },
});
