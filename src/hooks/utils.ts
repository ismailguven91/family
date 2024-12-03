export const getScoreStyle = (score: number) => {
  if (score < 0) {
    return { background: "#ff6f61", color: "#fff" }; // Negative
  } else if (score === 0) {
    return { background: "#ffb74d", color: "#fff" }; // Neutral
  } else {
    return { background: "#81c784", color: "#fff" }; // Positive
  }
};

export const getIconStyle = (score: number, isPhone: boolean) => {
  if (score < 0) {
    return {
      color: "rgba(0, 0, 0, 0.3)",
      opacity: 0.5,
    };
  } else if (score === 0 && isPhone) {
    return {
      color: "rgba(0, 0, 0, 0.3)",
      opacity: 0.5,
    };
  }
  return {
    color: "#000",
    opacity: 1,
  };
};

// utils/achievements.ts
export const badges = [
  { threshold: 10, label: "Bronze", image: "/assets/images/bronze.png" },
  { threshold: 25, label: "Silver", image: "/assets/images/silver.png" },
  { threshold: 50, label: "Gold", image: "/assets/images/gold.png" },
  { threshold: 100, label: "Diamond", image: "/assets/images/diamond.png" },
];

export const getBadgeDetails = (score: number) => {
  const currentBadge = badges.find((b) => score >= b.threshold) || badges[0];
  const nextBadge =
    badges.find((b) => b.threshold > score) || badges[badges.length - 1];
  const progressToNextBadge =
    nextBadge.threshold > score
      ? Math.round((score / nextBadge.threshold) * 100)
      : 100;

  return { currentBadge, nextBadge, progressToNextBadge };
};
