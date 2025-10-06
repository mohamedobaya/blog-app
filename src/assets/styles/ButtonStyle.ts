import { darkModeColors, lightModeColors } from "./colors";

export const buttonStyle = (theme: string, color: string) => {
  return {
    padding: "0.5em 1em",
    color: `${
      theme === "dark"
        ? darkModeColors.textPrimary
        : lightModeColors.textPrimary
    }`,
    textTransform: "capitalize",
    bgcolor: color,
    borderRadius: "12px",
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
      boxShadow: "none",
      transform: "translate(3px, 3px)",
    },
  };
};
