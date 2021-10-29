import { IconButton } from "@mui/material";
import { AccountBoxOutlined, NotificationsOutlined } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

function AppBarIcons() {
  return (
    <>
      <IconButton size="large">
        <AccountBoxOutlined fontSize="large" style={{ color: teal[800] }} />
      </IconButton>
      <div style={{ width: "2rem" }}></div>
      <IconButton size="large">
        <NotificationsOutlined fontSize="large" style={{ color: teal[800] }} />
      </IconButton>
    </>
  );
}

export default AppBarIcons;
