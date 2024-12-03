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
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // Single column for portrait
          landscape: "repeat(3, 1fr)", // Three columns for landscape orientation
        },
        gap: 2,
        padding: 2,
        "@media screen and (orientation: landscape)": {
          gridTemplateColumns: "repeat(3, 1fr)", // Explicit landscape handling
        },
      }}
    >
      <Typography
        variant="h4"
        onClick={handleTitlePress}
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none",
          gridColumn: "span 3", // Center title across columns in landscape mode
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
          getScoreStyle={getScoreStyle(kid.score)}
        />
      ))}

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
