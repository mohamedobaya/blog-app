import { createTheme } from "@mui/material";
import { lightModeColors, darkModeColors } from "../styles/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: lightModeColors.background, // Main background
      paper: lightModeColors.surface, // Surfaces/cards
    },
    text: {
      primary: lightModeColors.textPrimary, // Main text
      secondary: lightModeColors.textSecondary, // Secondary text
    },
    primary: {
      main: lightModeColors.primary, // Accent (yellow)
    },
    success: {
      main: lightModeColors.success,
    },
    warning: {
      main: lightModeColors.warning,
    },
    error: {
      main: lightModeColors.error,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: darkModeColors.background, // Main background
      paper: darkModeColors.surface, // Surfaces/cards
    },
    text: {
      primary: darkModeColors.textPrimary, // Main text
      secondary: darkModeColors.textSecondary, // Secondary text
    },
    primary: {
      main: darkModeColors.primary, // Accent (yellow)
    },
    success: {
      main: darkModeColors.success,
    },
    warning: {
      main: darkModeColors.warning,
    },
    error: {
      main: darkModeColors.error,
    },
  },
});
