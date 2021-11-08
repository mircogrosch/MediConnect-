import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Badge,
  IconButton,
  Typography,
} from "@mui/material";
import { NotificationsOutlined, MoreVert } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import logo from "../../img/mediconnect-logo.png";
import { socket } from "../Controlers/notifications";
import MenuPrueba from "./MenuPrueba";
import { getNotifications } from "../../actions";
import jwt from "jsonwebtoken";

export default function PrimarySearchAppBar(props) {
  //state global
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [numberNotification, setNotification] = useState(0);

  const dispatch = useDispatch();

  socket.on("reciveNotifications", (request) => {
    dispatch({ type: "SAVE_NOTIFICATION", payload: request });
  });

  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  useEffect(() => {
    setNotification(notifications.length);
  }, [notifications]);

  useEffect(() => {
    console.log(user.rol.id);
    dispatch(getNotifications(user.rol.id));
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge
            badgeContent={numberNotification}
            color="error"
            overlap="circular"
          >
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <Typography variant="inherit">Notifications</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ boxShadow: "-1px 4px 3px rgba(171,171,171,1)" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: props.bgColor || teal[200] }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} width="200px" alt="MediConnect+" />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Badge
              badgeContent={numberNotification}
              color="error"
              overlap="circular"
            >
              <MenuPrueba />
            </Badge>
            {/* </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert sx={{ color: props.color || teal[900] }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
