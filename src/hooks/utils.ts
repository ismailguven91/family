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
