import React, { useState, useEffect } from "react";
import Player from "./Player";
import FallingObject from "./FallingObject";
import Hearts from "./Hearts";
import windowsXP from "../assets/WindowsXP.png";

const GameBoard = () => {
  const [position, setPosition] = useState(window.innerWidth / 2);
  const [fallingObjects, setFallingObjects] = useState([]);
  const [lives, setLives] = useState(5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFallingObjects((prev) => [
        ...prev,
        {
          id: Math.random(),
          type: Math.random() < 0.2 ? "virus" : Math.random() < 0.4 ? "scam" : "product",
          positionX: Math.random() * 550, // Keep objects within 600px width (a bit smaller to fit)
        },
      ]);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const handleCatch = (type) => {
    if (type === "virus") {
      setLives((prev) => prev - 1);
    }
    setFallingObjects((prev) => prev.slice(1)); // Remove caught object
  };

  return (
    <div
  style={{
    width: "600px", // Set the new playable area width
    height: "500px", // Set the height
    position: "absolute", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)", // Centers it on the screen
    backgroundImage: `url(${windowsXP})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    border: "2px solid black", // Optional: Helps visualize the area
  }}
>

      <Hearts lives={lives} />
      <Player position={position} setPosition={setPosition} />
      {fallingObjects.map((obj) => (
        <FallingObject key={obj.id} type={obj.type} positionX={obj.positionX} onCatch={handleCatch} />
      ))}
      {lives <= 0 && <h1 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "red" }}>GAME OVER</h1>}
    </div>
  );
};

export default GameBoard;
