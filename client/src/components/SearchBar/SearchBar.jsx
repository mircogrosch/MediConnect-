import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { handleChangeSpecial } from "../Controlers/Controlers";

// const MySearchbar = styled(InputBase)({
//   width: "300px",
//   height: "50px",
//   backgroundColor: "#80cbc4",
//   border: "1px solid grey",
//   borderRadius: "5px",
//   margin: "15px",
//   padding: "0px 0px 0px 10px",
// });

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
