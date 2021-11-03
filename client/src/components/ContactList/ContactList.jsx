import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import SearchBar from '../SearchBar/SearchBar';
import CardDoctor from './CardDoctor';

const MyGrid = styled(Grid)({
    backgroundColor: teal[100],
    minHeight: '82vh',
    width: '40vw',
    borderRadius:'5px',
    marginTop: '30px',
    marginLeft: '10px',
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)"
})

const ContactList = () => {
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
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
              <ListItem>
                <CardDoctor/>
              </ListItem>
          </ul>
        </li>
      ))}
    </List>
    </MyGrid>
  );
}
export default ContactList