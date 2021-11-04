import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { handleChangeSpecial } from "../Controlers/Controlers";

const MySearchbar = styled(InputBase)({
  width: "300px",
  height: "50px",
  backgroundColor: "#80cbc4",
  borderRadius: "5px",
  margin: "15px",
  padding: "0px 0px 0px 10px",
});

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    console.log(input);
  };
  return (
    <MySearchbar
      variant="outlined"
      placeholder="Buscar"
      onChange={(e) => handleChangeSpecial(e, input, setInput)}
      endAdornment={
        <IconButton onClick={(e) => handleSubmit(e)}>
          <Search color="#bdbdbd" />
        </IconButton>
      }
    ></MySearchbar>
  );
};

export default SearchBar;
