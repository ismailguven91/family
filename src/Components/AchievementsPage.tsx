import React from "react";
import { Box, Typography, Avatar, CircularProgress, Card } from "@mui/material";
import { getBadgeDetails } from "../hooks/utils";

// Dummy Data
const kids = [
  { id: 1, name: "LIAM", score: 15, image: "/assets/images/liam.jpg" },
  { id: 2, name: "ISAAC", score: 40, image: "/assets/images/isaac.jpg" },
  { id: 3, name: "NOAH", score: 5, image: "/assets/images/noah.jpg" },
];

export const AchievementsPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Kids' Achievements
      </Typography>

      {kids.map((kid) => {
        const { currentBadge, nextBadge, progressToNextBadge } =
          getBadgeDetails(kid.score);

        return (
          <Card
            key={kid.id}
            sx={{
              width: "90%",
              padding: 2,
              marginBottom: 3,
              borderRadius: 4,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Kid Image */}
              <Avatar
                src={kid.image}
                alt={kid.name}
                sx={{
                  width: 80,
                  height: 80,
                  marginBottom: 2,
                  border: "3px solid rgba(255, 255, 255, 0.8)",
                }}
              />

              {/* Name */}
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {kid.name}
              </Typography>

              {/* Current Badge */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Avatar
                  src={currentBadge.image}
                  alt={currentBadge.label}
                  sx={{
                    width: 60,
                    height: 60,
                    marginRight: 2,
                  }}
                />
                <Typography>
                  Current Badge: <strong>{currentBadge.label}</strong>
                </Typography>
              </Box>

              {/* Progress to Next Badge */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={progressToNextBadge}
                  size={60}
                  thickness={5}
                />
                <Typography>
                  Progress to <strong>{nextBadge.label}</strong>:{" "}
                  {progressToNextBadge}%
                </Typography>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};
