import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "./ThemeContext";

export const Navbar: React.FC = () => {
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <AppBar
      position="static"
      sx={{
        background: darkMode ? "#333" : "#ddd",
        transition: "background 0.3s",
        padding: "0 16px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          Güven
        </Typography>
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Link to Behavior Tracker */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Poäng
          </Button>

          {/* Link to Achievements */}
          <Button
            color="inherit"
            component={Link}
            to="/achievements"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Achievements
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
