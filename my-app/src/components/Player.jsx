import React, { useEffect, useCallback } from "react";
import playerImage from "../assets/player.png";

const Player = ({ position, setPosition }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft" && position > 0) {
        setPosition((prev) => prev - 20);
      } else if (event.key === "ArrowRight" && position < 450) { // 600px - Player width (150px)
        setPosition((prev) => prev + 20);
      }
    },
    [position, setPosition]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: `${position}px`,
        width: "150px",
        height: "150px",
      }}
    >
      <img
        src={playerImage}
        alt="Old man with shopping cart"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default Player;
