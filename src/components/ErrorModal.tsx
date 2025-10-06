// components/modals/ErrorModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ButtonCustom from "./buttons/ButtonCustom";
import { darkModeColors, lightModeColors } from "../assets/styles/colors";

interface ErrorModalProps {
  theme: string;
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const ErrorModal = ({
  theme,
  open,
  title,
  message,
  onClose,
}: ErrorModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor:
            theme === "light"
              ? lightModeColors.surface
              : darkModeColors.surface,
          borderRadius: "12px",
          boxShadow: `8px 8px 0 ${
            theme === "light"
              ? lightModeColors.textPrimary
              : darkModeColors.textSecondary
          }`,
          border: `2px solid ${
            theme === "light"
              ? lightModeColors.textPrimary
              : darkModeColors.textSecondary
          }`,
          padding: "1em",
        },
      }}
    >
      <DialogTitle
        id="error-dialog-title"
        sx={{
          color:
            theme === "light"
              ? lightModeColors.textPrimary
              : darkModeColors.textPrimary,
          fontWeight: "bold",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="error-dialog-description"
          sx={{
            color:
              theme === "light"
                ? lightModeColors.textSecondary
                : darkModeColors.textSecondary,
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "1em" }}>
        <ButtonCustom
          theme={theme}
          content="ok"
          color={
            theme === "light" ? lightModeColors.success : darkModeColors.success
          }
          ButtonIcon={CheckIcon}
          isSubmit={false}
          onClick={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
