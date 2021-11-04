import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@mui/material/colors";

export const useStyles = makeStyles({
  root: {
    height: "90vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  container: {
    width: "95vw",
    height: "85vh",
    background: teal[100],
    borderRadius: "12px",
  },
  selectFilter: {
    background: teal[200],
    borderRadius: "5px",
  },
  searchBar: {
    width: "300px",
    height: "50px",
    margin: "15px",
    paddingLeft: "10px",
    background: teal[200],
    borderRadius: "5px",
  },
});
