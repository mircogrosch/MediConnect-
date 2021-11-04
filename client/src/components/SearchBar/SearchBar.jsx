import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { filterDoctorsByName } from "../../actions/index";
import { useDispatch } from "react-redux";

const MySearchbar = styled(InputBase)({
  backgroundColor: "#80cbc4",
  width: "500px",
  borderRadius: "3px",
  margin: "15px",
  // marginBottom:'0px',
  padding: "0px 0px 0px 10px",
  height: "50px",
});

const SearchBar = ({ idPatient }) => {
  const [input, setInput] = useState(""); // El input es un nombre
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(filterDoctorsByName(input, idPatient));
    setInput("");
  };

  return (
    // <Box sx={{backgroundColor: '#b2dfdb'}}>
    <MySearchbar
      variant="outlined"
      placeholder="Buscar"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      endAdornment={
        <IconButton onClick={handleSubmit}>
          <Search color="#bdbdbd" />
        </IconButton>
      }
    ></MySearchbar>
    // </Box>
  );
};

export default SearchBar;
