import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Kid {
  name: string;
  score: number;
}

export const BehaviorTracker: React.FC = () => {
  const [kids, setKids] = useState<Kid[]>([
    { name: "Liam", score: 0 },
    { name: "Isaac", score: 0 },
    { name: "Noah", score: 0 },
  ]);

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const CORRECT_PASSWORD = "1234";

  const handleScoreChange = (index: number, delta: number) => {
    const updatedKids = [...kids];
    updatedKids[index].score += delta;
    setKids(updatedKids);
  };

  const resetScores = () => {
    const resetKids = kids.map((kid) => ({ ...kid, score: 0 }));
    setKids(resetKids);
    setPasswordDialogOpen(false);
    setPasswordInput("");
  };

  const handleOpenPasswordDialog = () => {
    setPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
    setPasswordInput("");
    setError(false);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      resetScores();
    } else {
      setError(true);
    }
  };

  const getScoreStyle = (score: number) => {
    if (score < 0) {
      return { color: "#d32f2f", emoji: "😡", background: "#fdecea" };
    } else if (score >= 0 && score <= 3) {
      return { color: "#f57c00", emoji: "😐", background: "#fff3e0" };
    } else if (score > 3 && score <= 7) {
      return { color: "#2e7d32", emoji: "😊", background: "#e8f5e9" };
    } else {
      return { color: "#1976d2", emoji: "😃", background: "#e3f2fd" };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      {kids.map((kid, index) => {
        const { color, emoji, background } = getScoreStyle(kid.score);

        return (
          <Card
            key={index}
            sx={{
              flex: "0 1 30%", // Cards are 30% of the height
              width: "90%", // Cards take 90% of the width
              marginBottom: 2, // Spacing between cards
              borderRadius: 4,
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: background,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color,
                  marginBottom: 1,
                }}
              >
                {kid.name} {emoji}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "1.5rem", color }}>
                Score: <strong>{kid.score}</strong>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleScoreChange(index, 1)}
                  sx={{ fontSize: "1rem" }}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleScoreChange(index, -1)}
                  sx={{ fontSize: "1rem" }}
                >
                  -
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}

      {/* Password Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={handleClosePasswordDialog}
        aria-labelledby="password-dialog-title"
      >
        <DialogTitle id="password-dialog-title">Enter Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the numeric password to reset all scores.
          </DialogContentText>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            margin="dense"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            error={error}
            helperText={error ? "Incorrect password. Please try again." : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
