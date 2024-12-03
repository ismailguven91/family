import React from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useBehaviorTracker } from "../hooks/useBehaviorTracker";
import { KidCard } from "./KidCard";

// Images
import liamImage from "../assets/images/liam.jpg";
import isaacImage from "../assets/images/isaac.jpg";
import noahImage from "../assets/images/noah.jpg";
import { getScoreStyle } from "../hooks/utils";

export const BehaviorTracker: React.FC = () => {
  const {
    kids,
    buttonsEnabled,
    snackbarOpen,
    handleTitlePress,
    handleScoreChange,
    handleSnackbarClose,
  } = useBehaviorTracker([
    { name: "LIAM", score: 0, image: liamImage },
    { name: "ISAAC", score: 0, image: isaacImage },
    { name: "NOAH", score: 0, image: noahImage },
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: 2,
        gap: 1, // Add spacing between elements
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        onClick={handleTitlePress}
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none", // Prevent text selection
        }}
      >
        Poäng
      </Typography>

      {kids.map((kid, index) => (
        <KidCard
          key={index}
          kid={kid}
          index={index}
          buttonsEnabled={buttonsEnabled}
          onScoreChange={handleScoreChange}
          getScoreStyle={getScoreStyle(kid.score)} // Pass score style here
        />
      ))}

      {/* Snackbar for Buttons Enabled */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Knapparna går att använda i 1 minut!
        </Alert>
      </Snackbar>
    </Box>
  );
};
