import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NotificationsOutlined } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import CardNotification from "./CardNotification";
import { useSelector } from "react-redux";

const StyledMenu = styled((props) => (
  <Menu
    display="flex"
    alignItems="center"
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    width: 470,
    color: theme.palette.mode === "light",
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    verflowY: "auto",
    margin: 0,
    padding: 0,
    listStyle: "none",
    height: "100%",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bdbdbd",
      borderRadius: "50px",
    },
  },
}));

export default function CustomizedMenus() {
  let notifications = useSelector((state) => state.notification);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        size="small"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <NotificationsOutlined sx={{ fontSize: "1.6em", color: teal[900] }} />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {notifications.notifications &&
          notifications.notifications.map((e) => (
            <MenuItem onClick={handleClose} disableRipple>
              {e.description ? (
                <CardNotification
                  msg={e.description}
                  idDoctor={e.idDoctor}
                  idPatient={e.idPatient}
                  id={e.id}
                />
              ) : (
                <CardNotification
                  msg={e.message}
                  idDoctor={e.idReciver}
                  idPatient={e.id_patient}
                />
              )}
            </MenuItem>
          ))}
      </StyledMenu>
    </div>
  );
}
