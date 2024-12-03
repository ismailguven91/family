import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
} from "@mui/material";

// Badges
import bronzeBadge from "../assets/images/bronze.png";
import silverBadge from "../assets/images/silver.png";
import goldBadge from "../assets/images/gold.png";
import diamondBadge from "../assets/images/diamond.png";

interface AchievementProps {
  name: string;
  score: number;
}

const badges = [
  { threshold: 10, badge: bronzeBadge, label: "Bronze" },
  { threshold: 25, badge: silverBadge, label: "Silver" },
  { threshold: 50, badge: goldBadge, label: "Gold" },
  { threshold: 100, badge: diamondBadge, label: "Diamond" },
];

export const Achievements: React.FC<AchievementProps> = ({ name, score }) => {
  const currentBadge = badges.find((b) => score >= b.threshold) || badges[0];
  const nextBadge =
    badges.find((b) => b.threshold > score) || badges[badges.length - 1];
  const progressToNextBadge =
    nextBadge.threshold > score
      ? Math.round((score / nextBadge.threshold) * 100)
      : 100;

  return (
    <Card
      sx={{
        marginTop: 3,
        padding: 2,
        borderRadius: 4,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 2 }}
        >
          Achievements for {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Current Badge */}
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={currentBadge.badge}
              alt={currentBadge.label}
              sx={{
                width: 80,
                height: 80,
                border: "4px solid rgba(255, 215, 0, 0.8)", // Highlight
                boxShadow: "0px 0px 15px 5px rgba(255, 215, 0, 0.5)", // Glow
              }}
            />
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              Current Badge: {currentBadge.label}
            </Typography>
          </Box>

          {/* Progress to Next Badge */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={progressToNextBadge}
              size={60}
              thickness={5}
              sx={{
                color: progressToNextBadge === 100 ? "gold" : "gray",
              }}
            />
            <Typography variant="body1">
              Progress to {nextBadge.label}: {progressToNextBadge}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
