import React, { useState, useRef } from "react";
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
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const CORRECT_PASSWORD = "1234";

  const handleScoreChange = (index: number, delta: number) => {
    const updatedKids = [...kids];
    updatedKids[index].score += delta;
    setKids(updatedKids);

    // Log changes
    console.log(
      `Score changed: ${kids[index].name}, New Score: ${
        updatedKids[index].score
      }, Change: ${delta}, Time: ${new Date().toISOString()}`
    );

    // Capture picture
    captureImage();
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

  const startCamera = async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        console.log("Captured image data:", imageData);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

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
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: "none" }}
      />

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
            {/* Minus Button */}
            <Button
              variant="contained"
              color="error"
              onClick={() => handleScoreChange(index, -1)}
              sx={{
                flex: "0 0 20%",
                height: "100%",
                borderRadius: 0,
              }}
            >
              -
            </Button>

            {/* Center Content */}
            <CardContent
              sx={{
                flex: "1 1 auto",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {kid.name}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <PhoneAndroidIcon sx={{ fontSize: 48 }} />
                <SportsEsportsIcon sx={{ fontSize: 48 }} />
              </Box>

              <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
                Poäng: {kid.score}
              </Typography>
            </CardContent>

            {/* Plus Button */}
            <Button
              variant="contained"
              onClick={() => handleScoreChange(index, 1)}
              sx={{
                flex: "0 0 20%",
                height: "100%",
                borderRadius: 0,
              }}
            >
              +
            </Button>
          </Card>
        );
      })}

      {capturedImage && (
        <Box mt={2}>
          <Typography variant="h6">Captured Image:</Typography>
          <img src={capturedImage} alt="Captured" style={{ width: "100%" }} />
        </Box>
      )}
    </Box>
  );
};
