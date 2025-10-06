import { darkModeColors, lightModeColors } from "./colors";

export const blogCardStyle = (theme: string) => {
  return {
    width: {
      xs: "90%", // Full width on extra-small screens
      sm: "75%", // 75% width on small screens and up
      md: "50%", // 50% width on medium screens and up
    },
    backgroundColor: "background.surface",
    borderRadius: "12px",
    overflow: "hidden",
    margin: "1em auto",
    display: "flex",
    flexDirection: "column",

    boxShadow: `8px 8px 0 ${
      theme === "light"
        ? lightModeColors.textPrimary
        : darkModeColors.textSecondary
    }`,
    border: `1px solid ${
      theme === "light"
        ? lightModeColors.textPrimary
        : darkModeColors.background
    }`,
  };
};
