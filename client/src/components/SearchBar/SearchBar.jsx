import React, { useState } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { handleChangeSpecial } from "../Controlers/Controlers";

const SearchBar = (props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    console.log(input);
  };
  return (
    <InputBase
      variant="outlined"
      placeholder="Buscar"
      onChange={(e) => handleChangeSpecial(e, input, setInput)}
      className={props.styles.searchBar}
      endAdornment={
        <IconButton onClick={(e) => handleSubmit(e)}>
          <Search color="#bdbdbd" />
        </IconButton>
      }
    ></InputBase>
  );
};

export default SearchBar;
