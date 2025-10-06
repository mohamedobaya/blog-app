import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Avatar, Divider, IconButton, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAppSelector } from "../../redux/hooks";

interface NavbarProps {
  theme: string;
  handleTheme: () => void;
}

const Navbardrawer = ({ theme, handleTheme }: NavbarProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // console.log(user);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleTheme}>
            <ListItemIcon>
              {theme === "light" ? <BedtimeIcon /> : <SunnyIcon />}
            </ListItemIcon>
            <ListItemText primary={theme === "light" ? "dark" : "light"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {user ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/login")}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
      {user && <Typography>{user.displayName}</Typography>}
      <IconButton onClick={toggleDrawer(true)}>
        {user ? (
          <Avatar
            alt={user.displayName || user.email || "User"}
            src={user.photoURL || undefined}
            sx={{ cursor: "pointer" }}
          >
            {!user.photoURL &&
              (user.displayName?.[0] || user.email?.[0] || "U")}
          </Avatar>
        ) : (
          <MenuIcon />
        )}
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default Navbardrawer;
