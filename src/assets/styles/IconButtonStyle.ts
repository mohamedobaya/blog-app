import { darkModeColors, lightModeColors } from "./colors";

export const iconButtonStyle = (theme: string, color: string) => {
  return {
    padding: "0.4em",
    color: `${
      theme === "dark"
        ? darkModeColors.textPrimary
        : lightModeColors.textPrimary
    } !important`,
    bgcolor: `${color} !important`,
    borderRadius: "50%",
    boxShadow: `3px 3px 0 ${
      theme === "light"
        ? lightModeColors.textPrimary
        : darkModeColors.textSecondary
    }`,
    border: `1px solid ${
      theme === "light"
        ? lightModeColors.textPrimary
        : darkModeColors.background
    }`,
    transition: "all 0.3s ease-in-out",
    ":hover": {
      color: `${
        theme === "dark"
          ? darkModeColors.textPrimary
          : lightModeColors.textPrimary
      } !important`,
      boxShadow: "none",
      transform: "translate(3px, 3px)",
    },
  };
};
