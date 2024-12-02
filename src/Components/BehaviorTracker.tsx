import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import liamImage from "../assets/images/liam.jpg";
import isaacImage from "../assets/images/isaac.jpg";
import noahImage from "../assets/images/noah.jpg";
interface Kid {
  name: string;
  score: number;
  image: string; // Path to the image
}

export const BehaviorTracker: React.FC = () => {
  const [kids, setKids] = useState<Kid[]>([
    { name: "LIAM", score: 0, image: liamImage },
    { name: "ISAAC", score: 0, image: isaacImage },
    { name: "NOAH", score: 0, image: noahImage },
  ]);

  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [pressCount, setPressCount] = useState(0); // Track title presses
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (buttonsEnabled) {
      timer = setTimeout(() => {
        setButtonsEnabled(false);
      }, 60000);
    }
    return () => clearTimeout(timer);
  }, [buttonsEnabled]);

  const handleTitlePress = () => {
    setPressCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setButtonsEnabled(true);
        setSnackbarOpen(true);
      }
      return newCount % 5;
    });
  };

  const handleScoreChange = (index: number, delta: number) => {
    if (!buttonsEnabled) return;

    const updatedKids = [...kids];
    updatedKids[index].score += delta;
    setKids(updatedKids);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getScoreStyle = (score: number) => {
    if (score < 0) {
      return { background: "#ff6f61", color: "#fff" }; // Negative
    } else if (score === 0) {
      return { background: "#ffb74d", color: "#fff" }; // Neutral
    } else {
      return { background: "#81c784", color: "#fff" }; // Positive
    }
  };

  const getIconStyle = (score: number, isPhone: boolean) => {
    if (score < 0) {
      return {
        color: "rgba(0, 0, 0, 0.3)", // Disabled color
        opacity: 0.5,
      };
    } else if (score === 0 && isPhone) {
      return {
        color: "rgba(0, 0, 0, 0.3)", // Disabled color
        opacity: 0.5,
      };
    }
    return {
      color: "#000",
      opacity: 1,
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        padding: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        onClick={handleTitlePress}
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          fontFamily: "Helvetica Neue",
          cursor: "pointer", // Indicate the title is clickable
          userSelect: "none", // Prevent text selection
        }}
      >
        Poäng
      </Typography>

      {kids.map((kid, index) => {
        const { background, color } = getScoreStyle(kid.score);

        return (
          <Card
            key={index}
            sx={{
              width: "90%",
              marginBottom: 2,
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundColor: background,
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            {/* Minus Button on the Left */}
            <Box
              sx={{
                height: "100%",
                flex: "0 0 20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => handleScoreChange(index, -1)}
                disabled={!buttonsEnabled}
                sx={{
                  fontSize: "2rem",
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                  backgroundColor: "lightgray",
                }}
              >
                -
              </Button>
            </Box>

            {/* Center Content */}
            <CardContent
              sx={{
                flex: "1 1 auto",
                textAlign: "center",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Circular Image */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: 2,
                  border: "2px solid rgba(255, 255, 255, 0.8)",
                }}
              >
                <img
                  src={kid.image}
                  alt={`${kid.name}'s avatar`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 2,
                  fontFamily: "Helvetica Neue",
                }}
              >
                {kid.name}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                {/* Phone Icon */}
                <PhoneAndroidIcon
                  sx={{ fontSize: 48, ...getIconStyle(kid.score, true) }}
                />

                {/* Gaming Icon */}
                <SportsEsportsIcon
                  sx={{ fontSize: 48, ...getIconStyle(kid.score, false) }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", marginTop: 2, fontWeight: "bold" }}
              >
                Poäng: <strong>{kid.score}</strong>
              </Typography>
            </CardContent>

            {/* Plus Button on the Right */}
            <Box
              sx={{
                flex: "0 0 20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                height: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => handleScoreChange(index, 1)}
                disabled={!buttonsEnabled}
                sx={{
                  fontSize: "2rem",
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                  backgroundColor: "darkgray",
                }}
              >
                +
              </Button>
            </Box>
          </Card>
        );
      })}

      {/* Success Snackbar */}
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
