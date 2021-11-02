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
import {
  AccountBoxOutlined,
  NotificationsOutlined,
  MoreVert,
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import logo from "../../img/mediconnect-logo.png";

export default function PrimarySearchAppBar(props) {
  //state global
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [numberNotification, setNotification] = useState(0);

  useEffect(() => {
    setNotification(notifications.length / 2);
  }, [notifications]);

  console.log(notifications);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
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
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={numberNotification} color="error">
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <Typography variant="inherit">Notifications</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
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
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={numberNotification} color="error">
                <NotificationsOutlined
                  fontSize="large"
                  sx={{ color: props.color || teal[900] }}
                />
              </Badge>
            </IconButton>
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
