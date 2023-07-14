import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const locationState = location.state as { title?: string };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {locationState?.title ? locationState.title : "Главная"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
