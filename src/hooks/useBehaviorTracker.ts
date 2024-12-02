import { useState, useEffect } from "react";

interface Kid {
  name: string;
  score: number;
  image: string;
}

export const useBehaviorTracker = (initialKids: Kid[]) => {
  const [kids, setKids] = useState<Kid[]>(initialKids);
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (buttonsEnabled) {
      timer = setTimeout(() => {
        setButtonsEnabled(false);
      }, 30000);
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

    setKids((prevKids) =>
      prevKids.map((kid, idx) =>
        idx === index ? { ...kid, score: kid.score + delta } : kid
      )
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    kids,
    buttonsEnabled,
    snackbarOpen,
    handleTitlePress,
    handleScoreChange,
    handleSnackbarClose,
  };
};
