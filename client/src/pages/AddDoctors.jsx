import React, { useEffect } from "react";
import SimpleAppBar from "../components/AppBar/SimpleAppBar";
import ConteinerCardAdd from "../components/AddProfesional/ContainerCardAdd";
import { Grid, Box } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import FiltroSelect from "../components/FiltroSelect/FiltroSelect";
import { styled } from "@mui/material/styles";

const MyGrid = styled(Grid)({
  display: "flex",
  marginTop: "70px",
});
function AddDoctors(props) {
  return (
    <div>
      <Grid conteiner justifyContent="center" backgroundColor="primary">
        <Box bgcolor="#B2DFDB">
          <Grid item pb="50px">
            <SimpleAppBar />
            <MyGrid>
              <FiltroSelect />
              <SearchBar />
            </MyGrid>
          </Grid>
          <ConteinerCardAdd props={props} />
        </Box>
      </Grid>
    </div>
  );
}
export default AddDoctors;
