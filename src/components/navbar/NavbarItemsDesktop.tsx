import { useNavigate } from "react-router";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, Grid } from "@mui/material";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import ButtonCustom from "../buttons/ButtonCustom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAppSelector } from "../../redux/hooks";

interface NavbarProps {
  theme: string;
  handleTheme: () => void;
}

const NavbarItemsDesktop = ({ theme, handleTheme }: NavbarProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  console.log(user);

  return (
    <Grid container spacing={2}>
      {user && (
        <Avatar
          alt={user.displayName || user.email || "User"}
          src={user.photoURL || undefined}
          sx={{ cursor: "pointer" }}
          // onClick={() => navigate("/profile")} // Optional: navigate to profile page
        >
          {!user.photoURL && (user.displayName?.[0] || user.email?.[0] || "U")}
        </Avatar>
      )}
      <ButtonCustom
        theme={theme}
        content={theme === "light" ? "dark" : "light"}
        color={
          theme === "light"
            ? lightModeColors.background
            : darkModeColors.background
        }
        ButtonIcon={theme === "light" ? BedtimeIcon : SunnyIcon}
        onClick={handleTheme}
        isSubmit={false}
      />
      {!user && (
        <ButtonCustom
          theme={theme}
          content="Login"
          color={lightModeColors.success}
          ButtonIcon={LoginIcon}
          onClick={() => navigate("/login")}
          isSubmit={false}
        />
      )}
      {user && (
        <ButtonCustom
          theme={theme}
          content="logout"
          color={lightModeColors.error}
          ButtonIcon={LogoutIcon}
          onClick={handleLogout}
          isSubmit={false}
        />
      )}
    </Grid>
  );
};

export default NavbarItemsDesktop;
