// components/modals/ConfirmModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ButtonCustom from "./buttons/ButtonCustom";
import { darkModeColors, lightModeColors } from "../assets/styles/colors";

interface ConfirmModalProps {
  theme: string;
  open: boolean;
  title: string;
  message: string;
  onAccept: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  theme,
  open,
  title,
  message,
  onAccept,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
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
      <DialogActions sx={{ padding: "1em", gap: 1 }}>
        <ButtonCustom
          theme={theme}
          content="Cancel"
          color={
            theme === "light" ? lightModeColors.error : darkModeColors.error
          }
          ButtonIcon={CloseIcon}
          isSubmit={false}
          onClick={onCancel}
        />
        <ButtonCustom
          theme={theme}
          content="Confirm"
          color={
            theme === "light" ? lightModeColors.success : darkModeColors.success
          }
          ButtonIcon={CheckIcon}
          isSubmit={false}
          onClick={onAccept}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
