import React, { useState, useEffect } from "react";

const FallingObject = ({ type, positionX, onCatch }) => {
  const [positionY, setPositionY] = useState(0);
  const speed = type === "virus" ? 3 : 2; // Viruses fall slightly faster

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionY((prevY) => prevY + speed);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Check if object reaches the bottom
  useEffect(() => {
    if (positionY > 450) { // When object reaches bottom
      if (type === "product") {
        onCatch(type, positionX); // Pass object X position to check collision
      }
    }
  }, [positionY, type, positionX, onCatch]);
  
  return (
    <div
      style={{
        position: "absolute",
        top: `${positionY}px`,
        left: `${positionX}px`,
        width: "50px",
        height: "50px",
        backgroundColor: type === "virus" ? "red" : "green",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "50px",
        color: "white",
      }}
    >
      {type === "virus" ? "🦠" : type === "scam" ? "📢" : "📦"}
    </div>
  );
};

export default FallingObject;
