import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    padding: "1em",
    textAlign: "center",
    borderRadius: 12,
    position: "relative",
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)",
  },
  circleUser: {
    margin: "auto",
    width: "70%",
    borderRadius: "50%",
  },
  cardInfo: {
    padding: "1em",
    borderRadius: "5px",
  },
  textName: {
    fontSize: "1.4em",
    textAlign: "center",
  },
});
