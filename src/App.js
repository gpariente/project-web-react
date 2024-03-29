import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Explore from "./Explore";
import About from "./About";
import Forum from "./Forum";
import ShowPost from "./ShowPost";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userLoginToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setIsAuthenticated(true);
  };

  const handleSignupSuccess = () => {
    setIsSignupModalOpen(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoginToken");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Navbar
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogoutClick={() => setIsAuthenticated(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="explore" element={<Explore />} />
        <Route path="/forum/:categoryName" element={<Forum />} />
        <Route path="/showPost/:postId" element={<ShowPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
