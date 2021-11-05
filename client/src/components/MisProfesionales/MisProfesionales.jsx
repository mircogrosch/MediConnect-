import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import FiltroSelect from "../FiltroSelect/FiltroSelect";
import Card from "../Card/Card";
import AddProfesionals from "../Card/AddProfesionals";
import { Grid } from "@mui/material";
import SimpleAppBar from "../AppBar/SimpleAppBar";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getMyDoctors } from "../../actions";
import { Link } from "react-router-dom";

const MyGrid = styled(Grid)({
  display: "flex",
  marginTop: "70px",
});

const MisProfesionales = (props) => {
  const dispatch = useDispatch();
  let MyDoctors = useSelector((state) => state.myDoctors.names); // Guarda doctores asociados para renderizar en las cards
  
  useEffect(() => {
    // Dispara la accion para traer todos los doctores asociados al paciente
    dispatch(getMyDoctors(props.match.params.id));
  }, []);
  
  return (
    <Box
      sx={{ backgroundColor: "#b2dfdb", margin: "5px", borderRadius: "10px" }}
    >
      <Grid>
        <SimpleAppBar />
        <MyGrid>
          <FiltroSelect />
          <SearchBar idPatient={props.match.params.id} />
        </MyGrid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container items display="flex" justifyContent="center">
            <Link to={`/account/doctors/${props.match.params.id}`}>
              <AddProfesionals />
            </Link>
            {MyDoctors &&
              MyDoctors.data.map((e) => {
                return (
                  <Card
                    name={e.name}
                    lastname={e.lastname}
                    address={e.address}
                    idPatient={props.match.params.id}
                    idDoctor={e.id}
                  />
                );
              })}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default MisProfesionales;
