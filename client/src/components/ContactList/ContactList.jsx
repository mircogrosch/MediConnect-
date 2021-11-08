import React from 'react';
import List from '@mui/material/List';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import SearchBar from '../SearchBar/SearchBar';
import CardDoctor from './CardDoctor';
import { MenuItem } from '@mui/material';

const MyGrid = styled(Grid)({
    backgroundColor: teal[100],
    minHeight: '82vh',
    width: '40vw',
    borderRadius:'5px',
    marginTop: '30px',
    marginLeft: '10px',
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)"
})

const ContactList = ({user}) => {
  

  return (
    <MyGrid
    container
    item
  >
    <SearchBar/>
    <List
      sx={{
        overflowY: "auto",
        margin: 0,
        padding: 0,
        listStyle: "none",
        height: "100%",
        '&::-webkit-scrollbar': {
            width: '10px',
            
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'teal',
            borderRadius: '50px',
        },
        minWidth: '100%',
        bgcolor: 'transparent',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '68.5vh',
        minHeight:'68.5vh',
        // marginTop: '11vh',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {user && user.map((r) => (
        <li key={r.id}>
          <ul>
              <MenuItem>
                <CardDoctor name={r.name} lastname={r.lastname} email={r.email} rol={r.rol} img={r.imageProfile}/>
              </MenuItem>
          </ul>
        </li>
      ))}
    </List>
    </MyGrid>
  );
}
export default ContactList