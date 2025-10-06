import { Box, LinearProgress, Typography } from "@mui/material";

const LoadingBlogs = () => {
  return (
    <Box sx={{ width: "95%", justifySelf: "center", paddingTop: "5em" }}>
      <Typography
        variant="h4"
        color="text.primary"
        sx={{ justifySelf: "center" }}
      >
        Loading
      </Typography>
      <LinearProgress />
    </Box>
  );
};

export default LoadingBlogs;
