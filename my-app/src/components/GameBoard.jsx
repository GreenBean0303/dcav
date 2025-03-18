import React, { useState, useEffect } from "react";
import Player from "./Player";
import FallingObject from "./FallingObject";
import Hearts from "./Hearts";
import windowsXP from "../assets/WindowsXP.png";

const GameBoard = () => {
  const [position, setPosition] = useState(225); // Start in the middle of 600px
  const [fallingObjects, setFallingObjects] = useState([]);
  const [droppedItems, setDroppedItems] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFallingObjects((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          type: Math.random() < 0.2 ? "virus" : Math.random() < 0.4 ? "scam" : "product",
          positionX: Math.random() * 550, // Keep objects within 600px width
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCatch = (type, objectX, objectY, id) => {
    const playerWidth = 150;
    const playerHeight = 150;
    const playerBottom = 500 - 10;
    const playerTop = playerBottom - playerHeight;
    const playerLeft = position;
    const playerRight = playerLeft + playerWidth;

    const objectBottom = objectY + 50;
    const objectTop = objectY;
    const objectWidth = 50;

    const isXOverlap = objectX + objectWidth >= playerLeft && objectX <= playerRight;
    const isYOverlap = objectBottom >= playerTop && objectTop <= playerBottom;

    setFallingObjects((prev) => {
      if (!prev.find(obj => obj.id === id)) return prev;

      if (type === "product" && isXOverlap && isYOverlap) {
        console.log("✅ Product Caught!");
        return prev.filter(obj => obj.id !== id);
      }

      if (type === "product" && objectBottom >= 500) {
        console.log("❌ Product Dropped!");
        setDroppedItems((prevDropped) => Math.min(prevDropped + 1, 10));
        return prev.filter(obj => obj.id !== id);
      }

      if (type === "virus" || type === "scam") {
        console.log("⚠️ Virus/Scam ignored, removing...");
        return prev.filter(obj => obj.id !== id);
      }

      return prev;
    });
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

      {droppedItems >= 10 && (
        <h1 style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "red",
        }}>
          You got kicked out of online shopping! 🛒❌
        </h1>
      )}
    </div>
  );
};

export default GameBoard;
