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
  NotificationsOutlined,
  MoreVert,
  MailOutline,
  Logout,
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import logo from "../../img/mediconnect-logo.png";
import { socket } from "../Controlers/notifications";
import MenuPrueba from "./MenuPrueba";
import { getNotifications, getNotificationsMessage } from "../../actions";
import { logout } from "../Controlers/sessions";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { socketChat } from "../Controlers/chatMessage";
import { useHistory } from "react-router-dom";
export default function PrimarySearchAppBar(props) {
  const history = useHistory();
  //state global

  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [numberNotification, setNotification] = useState(0);

  const notificationsChat = useSelector(
    (state) => state.messages.notificationChat
  );
  const [numberNotificationChat, setNotificationChat] = useState(0);

  const dispatch = useDispatch();

  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  socketChat.on("reciveNotificationChat", (data) => {
    console.log("data", data);
    dispatch({ type: "SAVE_NOTIFICATION_CHAT", payload: data });
  });

  socket.on("reciveNotifications", (request) => {
    dispatch({ type: "SAVE_NOTIFICATION", payload: request });
  });

  useEffect(() => {
    setNotification(notifications.length);
  }, [notifications]);

  useEffect(() => {
    setNotificationChat(notificationsChat.length);
  }, [notificationsChat]);

  useEffect(() => {
    console.log(user.rol.id);
    dispatch(getNotifications(user.rol.id));
    dispatch(getNotificationsMessage(user.user.dni));
  }, [dispatch, user.rol.id, user.user.dni]);

  // const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // setAnchorEl(null);
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
            <Link
              to={
                user.user.rol === "Patient"
                  ? "/account/patient"
                  : "/account/profesional"
              }
            >
              <img src={logo} width="200px" alt="MediConnect+" />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              to={
                user.user.rol === "Patient"
                  ? "/mensajes/paciente"
                  : "/mensajes/profesional"
              }
            >
              <Badge
                badgeContent={numberNotificationChat}
                color="error"
                overlap="circular"
              >
                <IconButton>
                  <MailOutline
                    sx={{
                      fontSize: "1em",
                      color: props.color || teal[900],
                    }}
                  />
                </IconButton>
              </Badge>
            </Link>
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
            <IconButton onClick={() => logout(history)}>
              <Logout
                sx={{ fontSize: "1em", color: props.color || teal[900] }}
              />
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
