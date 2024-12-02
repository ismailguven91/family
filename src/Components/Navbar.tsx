import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useThemeContext } from "./ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const Navbar: React.FC = () => {
  const { toggleTheme, darkMode } = useThemeContext();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: darkMode
          ? "linear-gradient(90deg, #1c1c1c, #3a3a3a)"
          : "linear-gradient(90deg, #f5f5f5, #d6d6d6)",
        transition: "background 0.5s ease-in-out",
        padding: "0 16px",
      }}
    >
      <Toolbar>
        {/* Theme Toggle Button */}

        {/* Navbar Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1.5,
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          Güven
        </Typography>
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{
            marginRight: 2,
            "&:hover": {
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMenuOpen}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Behavior
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/settings"
              >
                Settings
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Desktop Buttons */}
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Behavior
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/settings"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Settings
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
