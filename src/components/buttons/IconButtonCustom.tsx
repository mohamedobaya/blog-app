import { IconButton } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

import { iconButtonStyle } from "../../assets/styles/IconButtonStyle";

interface Props {
  theme: string;
  color: string;
  ButtonIcon: SvgIconComponent;
  onClick: () => void;
  size?: "small" | "medium" | "large";
}

const IconButtonCustom = ({
  theme,
  color,
  ButtonIcon,
  onClick,
  size = "medium",
}: Props) => {
  return (
    <IconButton
      size={size}
      onClick={onClick}
      sx={{ ...iconButtonStyle(theme, color) }}
    >
      <ButtonIcon />
    </IconButton>
  );
};

export default IconButtonCustom;
