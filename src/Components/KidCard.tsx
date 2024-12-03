import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { getIconStyle } from "../hooks/utils";

interface Kid {
  name: string;
  score: number;
  image: string;
}

interface KidCardProps {
  kid: Kid;
  index: number;
  buttonsEnabled: boolean;
  onScoreChange: (index: number, delta: number) => void;
  getScoreStyle: { background: string; color: string };
}

export const KidCard: React.FC<KidCardProps> = ({
  kid,
  index,
  buttonsEnabled,
  onScoreChange,
  getScoreStyle,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Buttons at top/bottom on small screens
        width: "100%",
        marginBottom: 3,
        borderRadius: 16,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        background: `linear-gradient(145deg, ${getScoreStyle.background}, #ffffff10)`,
        color: getScoreStyle.color,
        animation: "fadeIn 0.5s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Minus Button */}
      <Box
        sx={{
          flex: "0 0 auto",
          height: { xs: "50px", sm: "100%" },
          width: { xs: "100%", sm: "20%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgray",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: buttonsEnabled ? "scale(1.05)" : "none",
          },
        }}
      >
        <Button
          variant="contained"
          onClick={() => onScoreChange(index, -1)}
          disabled={!buttonsEnabled}
          sx={{
            fontSize: "3rem",
            width: "100%",
            height: "100%",
            borderRadius: 0,
            color: "#fff",
            backgroundColor: "lightgray",
            "&:hover": {
              backgroundColor: "gray",
            },
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
          gap: 1,
        }}
      >
        <Stack
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: 2,
            border: `4px solid rgba(255, 255, 255, 0.8)`,
            boxShadow: `0px 0px 15px 5px rgba(255, 255, 255, 0.3)`,
            animation: "pulse 2s infinite ease-in-out",
            "@keyframes pulse": {
              "0%, 100%": {
                boxShadow: `0px 0px 15px 5px rgba(255, 255, 255, 0.3)`,
              },
              "50%": {
                boxShadow: `0px 0px 25px 10px rgba(255, 255, 255, 0.5)`,
              },
            },
          }}
        >
          <img
            src={kid.image}
            alt={`${kid.name}'s avatar`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Stack>

        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {kid.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <PhoneAndroidIcon
            sx={{
              fontSize: 48,
              transition: "opacity 0.3s ease",
              ...getIconStyle(kid.score, true),
            }}
          />
          <SportsEsportsIcon
            sx={{
              fontSize: 48,
              transition: "opacity 0.3s ease",
              ...getIconStyle(kid.score, false),
            }}
          />
        </Box>

        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Poäng: <strong>{kid.score}</strong>
        </Typography>
      </CardContent>

      {/* Plus Button */}
      <Box
        sx={{
          flex: "0 0 auto",
          height: { xs: "50px", sm: "100%" },
          width: { xs: "100%", sm: "20%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "darkgray",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: buttonsEnabled ? "scale(1.05)" : "none",
          },
        }}
      >
        <Button
          variant="contained"
          onClick={() => onScoreChange(index, 1)}
          disabled={!buttonsEnabled}
          sx={{
            fontSize: "3rem",
            width: "100%",
            height: "100%",
            borderRadius: 0,
            color: "#fff",
            backgroundColor: "darkgray",
            "&:hover": {
              backgroundColor: "#505050",
            },
          }}
        >
          +
        </Button>
      </Box>
    </Card>
  );
};
