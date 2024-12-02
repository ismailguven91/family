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
  Snackbar,
  Alert,
} from "@mui/material";

interface Kid {
  name: string;
  score: number;
}

export const BehaviorTracker: React.FC = () => {
  const [kids, setKids] = useState<Kid[]>([
    { name: "LIAM", score: 0 },
    { name: "ISAAC", score: 0 },
    { name: "NOAH", score: 0 },
  ]);

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For success popup

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
    setSnackbarOpen(true); // Show success popup
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getScoreStyle = (score: number) => {
    if (score < 0) {
      return { background: "#ff6f61", emoji: "😡", color: "#fff" };
    } else if (score >= 0 && score <= 3) {
      return { background: "#ffb74d", emoji: "😐", color: "#fff" };
    } else if (score > 3 && score <= 7) {
      return { background: "#81c784", emoji: "😊", color: "#fff" };
    } else {
      return { background: "#4fc3f7", emoji: "😃", color: "#fff" };
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
        padding: 2,
      }}
    >
      {/* Title */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Poäng Tracker
      </Typography>

      {kids.map((kid, index) => {
        const { background, emoji, color } = getScoreStyle(kid.score);

        return (
          <Card
            key={index}
            sx={{
              width: "90%",
              marginBottom: 2,
              borderRadius: 4,
              boxShadow: 3,
              backgroundColor: background,
              color: color,
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                }}
              >
                {kid.name} {emoji}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
                Poäng: <strong>{kid.score}</strong>
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

      {/* Reset Button */}
      <Button
        variant="outlined"
        onClick={handleOpenPasswordDialog}
        sx={{
          marginTop: 3,
          paddingX: 4,
          fontWeight: "bold",
        }}
      >
        Nollställ Poäng
      </Button>

      {/* Password Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={handleClosePasswordDialog}
        aria-labelledby="password-dialog-title"
      >
        <DialogTitle id="password-dialog-title">Lösenord</DialogTitle>
        <DialogContent>
          <DialogContentText>Ange lösenord</DialogContentText>
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
          <Button onClick={handleClosePasswordDialog} color="error">
            Avbryt
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Nollställ Poäng
          </Button>
        </DialogActions>
      </Dialog>

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
          Poängen har nollställts!
        </Alert>
      </Snackbar>
    </Box>
  );
};
