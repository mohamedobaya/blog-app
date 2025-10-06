interface themeModeColor {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  success: string;
  warning: string;
  error: string;
}

export const lightModeColors: themeModeColor = {
  background: "#FFFFFF",
  surface: "#F9F9F9",
  textPrimary: "#111111",
  textSecondary: "#6B6B6B",
  primary: "#F4D04E",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
};

export const darkModeColors: themeModeColor = {
  background: "#111111",
  surface: "#1A1A1A",
  textPrimary: "#FFFFFF",
  textSecondary: "#A9A9A9",
  primary: "#F4D04E",
  success: "#66BB6A",
  warning: "#FFB74D",
  error: "#EF5350",
};
