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
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CloseIcon from "@mui/icons-material/Close";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    setSnackbarOpen(true);
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
      return { background: "#ff6f61", color: "#fff" }; // Negative
    } else if (score === 0) {
      return { background: "#ffb74d", color: "#fff" }; // Neutral
    } else {
      return { background: "#81c784", color: "#fff" }; // Positive
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
              }}
            >
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
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <PhoneAndroidIcon sx={{ fontSize: 48 }} />
                  {kid.score <= 0 && (
                    <CloseIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 48,
                        color: "rgba(255, 0, 0, 0.8)",
                      }}
                    />
                  )}
                </Box>

                {/* Gaming Icon */}
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <SportsEsportsIcon sx={{ fontSize: 48 }} />
                  {kid.score < 0 && (
                    <CloseIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 48,
                        color: "rgba(255, 0, 0, 0.8)",
                      }}
                    />
                  )}
                </Box>
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

      {/* Reset Button */}
      <Button
        variant="outlined"
        onClick={handleOpenPasswordDialog}
        sx={{
          marginTop: 3,
          paddingX: 4,
          fontWeight: "bold",
          fontFamily: "Helvetica Neue",
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
