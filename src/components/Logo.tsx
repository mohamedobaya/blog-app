import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src="/logo.png"
        alt="Description"
        sx={{
          width: "100%",
          maxWidth: "2em",
        }}
      />
      <Typography
        variant="body1"
        sx={{
          textTransform: "none",
          fontFamily: "monospace",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        logify
      </Typography>
    </Box>
  );
};

export default Logo;
