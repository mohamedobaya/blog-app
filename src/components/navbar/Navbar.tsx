import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import Logo from "../Logo";
import Navbardrawer from "./Navdrawer";

interface NavbarProps {
  theme: string;
  handleTheme: () => void;
}

const Navbar = ({ theme, handleTheme }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, margin: 0, marginBottom: "5em" }}>
      <AppBar
        position="fixed"
        sx={{
          borderRadius: "0 0 0 12px",
          boxShadow: `8px 8px 0 ${
            theme === "light"
              ? lightModeColors.textPrimary
              : darkModeColors.textSecondary
          }`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <Logo />
          </Button>
          <Navbardrawer theme={theme} handleTheme={handleTheme} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
