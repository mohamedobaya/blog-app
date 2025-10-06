import { darkModeColors, lightModeColors } from "./colors";

export const addBlogStyle = (theme: string) => {
  return {
    position: "fixed",
    bottom: 16, // spacing from bottom
    right: 16, // spacing from right
    bgcolor: "primary.main",
    color: "text.primary",
    border: `4px solid ${
      theme === "light" ? lightModeColors.textPrimary : darkModeColors.primary
    }`,
    "&:hover": { bgcolor: "primary.dark" },
  };
};
