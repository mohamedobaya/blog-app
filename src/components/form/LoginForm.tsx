import { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ButtonCustom from "../buttons/ButtonCustom";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import { blogCardStyle } from "../../assets/styles/BlogCardStyle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAppSelector } from "../../redux/hooks";
import ErrorModal from "../ErrorModal";

interface Props {
  theme: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginFrom = ({ theme }: Props) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  // Modal state
  const [errorModal, setErrorModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const showError = (title: string, message: string) => {
    setErrorModal({
      open: true,
      title,
      message,
    });
  };

  const closeErrorModal = () => {
    setErrorModal({
      open: false,
      title: "",
      message: "",
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/"); // Redirect to home or dashboard after login
    } catch (error: any) {
      console.error("Login error:", error);

      // Show appropriate error message based on error code
      if (error.code === "auth/user-not-found") {
        showError(
          "User Not Found",
          "No account exists with this email address."
        );
      } else if (error.code === "auth/wrong-password") {
        showError("Invalid Password", "The password you entered is incorrect.");
      } else if (error.code === "auth/invalid-email") {
        showError("Invalid Email", "Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        showError(
          "Too Many Attempts",
          "Too many failed login attempts. Please try again later."
        );
      } else if (error.code === "auth/invalid-credential") {
        showError(
          "Invalid Credentials",
          "The email or password you entered is incorrect."
        );
      } else {
        showError(
          "Login Failed",
          "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Stack
        component="form"
        sx={{
          ...blogCardStyle(theme),
          padding: {
            xs: "2em",
            sm: "3em",
            md: "5em",
          },
          bgcolor: `${
            theme === "light" ? lightModeColors.surface : darkModeColors.surface
          }`,
        }}
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h3" sx={{ paddingBottom: "1em" }}>
          Login
        </Typography>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          color={errors.email ? "error" : "success"}
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          helperText={errors.email ? "Must be in email format" : ""}
          slotProps={{
            formHelperText: {
              sx: {
                color:
                  theme === "light"
                    ? lightModeColors.error
                    : darkModeColors.error,
              },
            },
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          color={errors.password ? "error" : "success"}
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          helperText={
            errors.password
              ? "Password should be at least 6 characters in length"
              : ""
          }
          slotProps={{
            formHelperText: {
              sx: {
                color:
                  theme === "light"
                    ? lightModeColors.error
                    : darkModeColors.error,
              },
            },
          }}
        />
        <ButtonCustom
          theme={theme}
          content="login"
          color={
            theme === "light" ? lightModeColors.success : darkModeColors.success
          }
          ButtonIcon={ExitToAppIcon}
          isSubmit={true}
          onClick={() => {}}
        />

        <ButtonCustom
          theme={theme}
          content="register"
          color={
            theme === "light" ? lightModeColors.warning : darkModeColors.warning
          }
          ButtonIcon={ExitToAppIcon}
          isSubmit={false}
          onClick={() => {
            navigate("/register");
          }}
        />
      </Stack>

      {/* Error Modal */}
      <ErrorModal
        theme={theme}
        open={errorModal.open}
        title={errorModal.title}
        message={errorModal.message}
        onClose={closeErrorModal}
      />
    </>
  );
};

export default LoginFrom;
