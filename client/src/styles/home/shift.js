import { makeStyles } from "@material-ui/core";
import { grey } from "@mui/material/colors";

export const useStyles = makeStyles({
  cardInfo: {
    padding: "1em",
    backgroundColor: "red",
    width: 180,
    display: "flex",
    justifyContent: "center",
  },
  letters: {
    color: grey[700],
    fontSize: "1rem",
    textAlign: "left",
  },
});
