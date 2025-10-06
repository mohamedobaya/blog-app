import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { lightTheme, darkTheme } from "./assets/themes/themes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { toggleTheme } from "./redux/slices/themeSlice";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/slices/authSlice";
import { auth } from "./config/firebase";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  // -------- redux (dispatch & selector) --------
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  // changing theme
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {/* <Auth /> */}
      <Box component="div" sx={{ position: "relative", minHeight: "100vh" }}>
        <Navbar theme={theme} handleTheme={handleTheme} />
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/login" element={<LoginPage theme={theme} />} />
          <Route path="/register" element={<RegisterPage theme={theme} />} />
          <Route path="/add-blog" element={<AddBlogPage theme={theme} />} />
          <Route
            path="/edit-blog/:bid"
            element={<EditBlogPage theme={theme} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
