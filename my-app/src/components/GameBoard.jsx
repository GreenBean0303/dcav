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
          id: Math.random(),
          type: Math.random() < 0.2 ? "virus" : Math.random() < 0.4 ? "scam" : "product",
          positionX: Math.random() * 550, // Keep objects within 600px width
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCatch = (type, objectX) => {
    const playerWidth = 150; // Width of player (shopping cart)
    const playerLeft = position; // Player's left side X position
    const playerRight = playerLeft + playerWidth; // Player's right side X position
  
    if (type === "product") {
      // Check if the product falls within the player's catching range
      if (objectX + 50 >= playerLeft && objectX <= playerRight) { // 50px = object size
        // Caught the product, remove it
        setFallingObjects((prev) => prev.filter(obj => obj.positionX !== objectX));
      } else {
        // If the product was missed, increase the dropped count
        setDroppedItems((prev) => prev + 1);
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
