// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ladyImage from "../assets/lady-placeholder.png";

const Home = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.email) {
      setUserEmail(userData.email);
    } else {
      // If no user data, redirect to login
      navigate("/auth/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 sm:p-6">
      {/* Welcome Text */}
      <h1 className="text-xl sm:text-2xl font-medium text-gray-800 mb-1 sm:mb-2">
        Welcome to
      </h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#6358DC] mb-4 sm:mb-6">
        Unstop
      </h2>

      {/* Profile Card */}
      <div
        className="
          bg-white
          rounded-xl
          p-4 sm:p-6
          flex
          flex-col
          items-center
          w-full
          max-w-[280px] sm:max-w-[300px] md:max-w-[320px]
          mt-[70px]
          shadow-[0_6px_12px_-2px_rgba(0,0,0,0.25),-2px_4px_10px_-3px_rgba(0,0,0,0.2),2px_4px_10px_-3px_rgba(0,0,0,0.2)]
        "
      >
        {/* Profile Image */}
        <img
          src={ladyImage}
          alt="Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 object-cover"
        />

        {/* User Info */}
        <h3 className="text-[#6358DC] font-semibold text-lg sm:text-xl mb-1">
          Michael Dam
        </h3>
        <p className="text-gray-500 text-sm sm:text-base mb-1">
          {userEmail || "example@gmail.com"}
        </p>
        <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
          Female
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            bg-[#6358DC]
            text-white
            py-2 px-6
            rounded-full
            hover:bg-blue-700
            transition-colors
            mb-4
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
