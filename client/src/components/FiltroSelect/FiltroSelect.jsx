import React, { useEffect, useState } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { handleChangeSpecial } from "../Controlers/Controlers";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialities } from "../../actions";

const FiltroSelect = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [special, setSpecial] = useState("");

  const specialities = useSelector((state) => state.allSpecialities);

  useEffect(() => {
    dispatch(getSpecialities());
  }, [dispatch]);

  return (
    <Box>
      <TextField
        select
        variant="filled"
        label="Especialidades"
        value={special}
        SelectProps={{
          native: true,
        }}
        InputProps={{ disableUnderline: true }}
        onChange={(e) => handleChangeSpecial(e, special, setSpecial)}
        className={classes.selectFilter}
        sx={{ margin: "15px" }}
      >
        <option disabled>{""}</option>
        {specialities.allSpecialities.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </TextField>
    </Box>
  );
};

export default FiltroSelect;
