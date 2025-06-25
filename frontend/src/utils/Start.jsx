import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {StartNav} from "./Nav/Navbar";
import DasboardPreview from "./Nav/DasboardPreview";
import HeroSection from "./Nav/HeroSection";

const Start = () => {
  const token = localStorage.getItem("token");
  const admintoken = localStorage.getItem("admintoken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/emp-home");
    }
    if (admintoken) {
      navigate("/admin-home");
    }
  }, [token, admintoken]);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 min-h-screen text-white">
      <StartNav />

      <HeroSection />

      <DasboardPreview />
    </div>
  );
};

export default Start;
