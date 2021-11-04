import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { handleChangeSpecial } from "../Controlers/Controlers";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialities } from "../../actions";

const MySelect = styled(TextField)({
  backgroundColor: "#80cbc4",
  width: "500px",
  borderRadius: "3px",
  margin: "15px",
  marginRight: "270px",
});

const FiltroSelect = () => {
  const dispatch = useDispatch();
  const [special, setSpecial] = useState("");

  const specialities = useSelector((state) => state.allSpecialities);

  useEffect(() => {
    dispatch(getSpecialities());
  }, [dispatch]);

  return (
    <Box>
      <MySelect
        select
        color="transparent"
        label="Especialidades"
        value={special}
        SelectProps={{
          native: true,
        }}
        onChange={(e) => handleChangeSpecial(e, special, setSpecial)}
      >
        <option disabled>{""}</option>
        {specialities.allSpecialities.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </MySelect>
    </Box>
  );
};

export default FiltroSelect;
