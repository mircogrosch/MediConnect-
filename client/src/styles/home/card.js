import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#B2DFDB",
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    color: "#004D40",
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    marginLeft: 2.5,
    textAlign: "center",
    fontWeight: 500,
  },
  shifsContainer: {
    dispaly: "flex",
  },
}));

export default useStyles;
