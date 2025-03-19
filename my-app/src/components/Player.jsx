import React, { useEffect, useCallback } from "react";
import playerImage from "../assets/player.png";

const Player = ({ position, setPosition, paused, gameOver }) => {
  const handleKeyDown = useCallback(
    (event) => {
      
      console.log("Game paused:", paused, "Game over:", gameOver, "Event key:", event.key);

      
      if (paused || gameOver) {
        console.log("Movement disabled");
        return;
      }

     
      const playerWidth = 150;
      const rightEdge = window.innerWidth;

      
      if (event.key === "ArrowLeft") {
       
        setPosition((prev) => {
          const newPosition = Math.max(prev - 20, 0);
          console.log("New left position:", newPosition);
          return newPosition;
        });
      } else if (event.key === "ArrowRight") {
        
        setPosition((prev) => {
          const newPosition = Math.min(prev + 20, rightEdge - playerWidth);
          console.log("New right position:", newPosition);
          return newPosition;
        });
      }
    },
    [paused, gameOver, setPosition] 
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div style={{ position: "absolute", bottom: "10px", left: `${position}px`, width: "150px", height: "150px" }}>
      <img src={playerImage} alt="Old man with shopping cart" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default Player;
