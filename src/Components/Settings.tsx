import React from "react";
import { Box, Typography } from "@mui/material";

export const Settings: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Settings</Typography>
      <Typography variant="body1">Configure your app settings here.</Typography>
    </Box>
  );
};
