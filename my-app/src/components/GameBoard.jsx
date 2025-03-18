import React, { useState, useEffect } from "react";
import Player from "./Player";
import FallingObject from "./FallingObject";
import Hearts from "./Hearts";
import windowsXP from "../assets/WindowsXP.png";

const GameBoard = () => {
  const [position, setPosition] = useState(window.innerWidth / 2);
  const [fallingObjects, setFallingObjects] = useState([]);
  const [droppedItems, setDroppedItems] = useState(0); // Track how many products are dropped

  useEffect(() => {
    const interval = setInterval(() => {
      setFallingObjects((prev) => [
        ...prev,
        {
          id: Math.random(), // Assign a unique id to each object
          type: Math.random() < 0.2 ? "virus" : Math.random() < 0.4 ? "scam" : "product",
          positionX: Math.random() * 550, // Keep objects within 600px width
        },
      ]);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const handleCatch = (type, objectX, objectY, id) => {
    const playerWidth = 150; // Player's width
    const playerBottom = 500 - 10; // Player's bottom position (from GameBoard height - bottom padding)
    const playerLeft = position;
    const playerRight = playerLeft + playerWidth;
    const objectBottom = objectY + 50; // Falling object's bottom position
  
    if (type === "product") {
      // Check if the object is within the player's area
      if (objectBottom >= playerBottom && objectX + 50 >= playerLeft && objectX <= playerRight) {
        setFallingObjects((prev) => prev.filter(obj => obj.id !== id)); // Remove caught object
      } else if (objectBottom > playerBottom) {
        // If product hits the ground, increase dropped items
        setDroppedItems((prev) => prev + 1);
        setFallingObjects((prev) => prev.filter(obj => obj.id !== id)); // Remove missed object
      }
    }
  };
  

  return (
    <div
      style={{
        width: "600px",
        height: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage: `url(${windowsXP})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        border: "2px solid black",
      }}
    >
      <h2 style={{ position: "absolute", top: "10px", right: "10px", color: "white" }}>
        Dropped Items: {droppedItems} / 10
      </h2>

      <Hearts lives={5 - droppedItems} />
      <Player position={position} setPosition={setPosition} />
      
      {fallingObjects.map((obj) => (
        <FallingObject key={obj.id} type={obj.type} positionX={obj.positionX} onCatch={handleCatch} />
      ))}

      {/* If player drops 10 products, they lose */}
      {droppedItems >= 10 && (
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "red",
          }}
        >
          You got kicked out of online shopping! 🛒❌
        </h1>
      )}
    </div>
  );
};

export default GameBoard;
