import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BehaviorTracker } from "./components/BehaviorTracker";
import { Navbar } from "./components/Navbar";
import { Settings } from "./components/Settings";
import { ThemeContextProvider } from "./components/ThemeContext";

export const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BehaviorTracker />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
