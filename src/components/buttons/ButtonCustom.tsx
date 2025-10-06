import { Button } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { buttonStyle } from "../../assets/styles/ButtonStyle";

interface Props {
  theme: string;
  content: string;
  color: string;
  ButtonIcon: SvgIconComponent;
  isSubmit: boolean;
  onClick: () => void;
}

const ButtonCustom = ({
  theme,
  content,
  color,
  ButtonIcon,
  isSubmit = false,
  onClick,
}: Props) => {
  return (
    <Button
      size="small"
      startIcon={<ButtonIcon />}
      sx={buttonStyle(theme, color)}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
    >
      {content}
    </Button>
  );
};

export default ButtonCustom;
