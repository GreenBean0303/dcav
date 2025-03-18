import React, { useState, useEffect } from "react";

const Player = ({ position, setPosition }) => {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" && position > 0) {
      setPosition((prev) => prev - 20); // Move left
    } else if (event.key === "ArrowRight" && position < window.innerWidth - 80) {
      setPosition((prev) => prev + 20); // Move right
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: `${position}px`,
        width: "80px",
        height: "80px",
        backgroundColor: "brown", // Temporary color
        textAlign: "center",
        lineHeight: "80px",
        color: "white",
        borderRadius: "10px",
      }}
    >
      🧓🛒
    </div>
  );
};

export default Player;
