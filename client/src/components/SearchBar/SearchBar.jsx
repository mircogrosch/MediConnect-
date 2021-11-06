import React, { useState } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { filterDoctorsByName } from "../../actions/index";
import { useDispatch } from "react-redux";

const SearchBar = ({ idPatient, styles, filterName }) => {
  const classes = useStyles();
  const [input, setInput] = useState(""); // El input es un nombre
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(filterName(input, idPatient));
    setInput("");
  };

  return (
    <InputBase
      variant="outlined"
      placeholder="Buscar"
      value={input}
      className={classes.searchBar}
      onChange={(e) => setInput(e.target.value)}
      endAdornment={
        <IconButton onClick={handleSubmit}>
          <Search color="#bdbdbd" />
        </IconButton>
      }
    ></InputBase>
  );
};

export default SearchBar;
