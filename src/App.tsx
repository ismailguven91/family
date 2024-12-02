import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BehaviorTracker } from "./Components/BehaviorTracker";
import { Navbar } from "./Components/Navbar";
import { Settings } from "./Components/Settings";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme();

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BehaviorTracker />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
