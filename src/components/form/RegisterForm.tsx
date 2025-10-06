import { Stack, TextField, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GoogleIcon from "@mui/icons-material/Google";
import ButtonCustom from "../buttons/ButtonCustom";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import { blogCardStyle } from "../../assets/styles/BlogCardStyle";
import { useForm } from "react-hook-form";
import AvatarUpload from "../buttons/AvatarUpload";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

interface Props {
  theme: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterFrom = ({ theme }: Props) => {
  // ---- handling image url -------
  const [profileImageURL, setProfileImageURL] = useState("");
  const profileImageHandler = (url: string) => {
    setProfileImageURL(url);
  };
  // -------------------------------

  const navigate = useNavigate();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // 2. Update Firebase Auth profile with display name
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL: profileImageURL,
      });

      // 3. Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        username: data.name,
        email: data.email,
        photoURL: profileImageURL,
      });

      console.log("User registered:", userCredential.user);
      window.location.reload();
      navigate("/"); // Redirect to home after registration
    } catch (error: any) {
      console.error("Registration error:", error);
      // Handle errors with user-friendly messages
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  // const handleGoogleRegister = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);

  //     // Create user document for Google sign-in users too
  //     await setDoc(doc(db, "users", result.user.uid), {
  //       uid: result.user.uid,
  //       username: result.user.displayName,
  //       email: result.user.email,
  //       photoURL: result.user.photoURL,
  //     });

  //     navigate("/"); // Redirect after successful Google sign-in
  //   } catch (error) {
  //     console.error("Google registration error:", error);
  //     alert("Google registration failed. Please try again.");
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  return (
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
        Register
      </Typography>

      <AvatarUpload theme={theme} imageUploadHandler={profileImageHandler} />

      <TextField
        id="name"
        label="Name"
        variant="outlined"
        color={errors.name ? "error" : "success"}
        {...register("name", {
          required: true,
          minLength: 3,
        })}
        helperText={
          errors.name ? "Name must be at least 3 characters in length" : ""
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

      <TextField
        id="confirm-password"
        label="Confirm Password"
        variant="outlined"
        type="password"
        color={errors.confirmPassword ? "error" : "success"}
        {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === watch("password") || "Passwords don't match",
        })}
        helperText={errors.confirmPassword ? "Passwords don't match" : ""}
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
        content="register"
        color={
          theme === "light" ? lightModeColors.success : darkModeColors.success
        }
        ButtonIcon={ExitToAppIcon}
        isSubmit={true}
        onClick={() => {}}
      />

      {/* <ButtonCustom
        theme={theme}
        content="google register"
        color={
          theme === "light"
            ? lightModeColors.background
            : darkModeColors.background
        }
        ButtonIcon={GoogleIcon}
        isSubmit={false}
        onClick={handleGoogleRegister}
      /> */}
    </Stack>
  );
};

export default RegisterFrom;
