import React, { useState, useEffect } from "react";
import appleImage from "../assets/apple.png";
import tvImage from "../assets/tv.png";
import virus1 from "../assets/ILOVEYOUvirus.png";
import virus2 from "../assets/virus.png";
import virus3 from "../assets/Youareanidiot.png";
import scamImage from "../assets/pop-up.png";

const virusImages = [virus1, virus2, virus3];
const productImages = [appleImage, tvImage];
const scamImages = [scamImage];

const FallingObject = ({ type, positionX, onCatch, id, gameOver, playerPosition }) => {
  const [positionY, setPositionY] = useState(0);
  const speed = type === "virus" ? 3 : 2;
  const [caught, setCaught] = useState(false);

  // Store a randomly chosen image **once** when the object is created
  const [objectImage] = useState(() => {
    if (type === "virus") return virusImages[Math.floor(Math.random() * virusImages.length)];
    if (type === "scam") return scamImages[0];
    return productImages[Math.floor(Math.random() * productImages.length)];
  });

  useEffect(() => {
    if (gameOver || caught) return;

    const interval = setInterval(() => {
      setPositionY((prevY) => {
        if (prevY >= 500) {
          if (type === "product") {
            onCatch(type, positionX, prevY, id);
          }
          return prevY;
        }

        // Check if object is caught by the player
        const playerWidth = 150;
        const playerHeight = 150;
        const playerBottom = 500;
        const playerTop = playerBottom - playerHeight;
        const playerLeft = playerPosition;
        const playerRight = playerLeft + playerWidth;

        const objectBottom = prevY + 50;
        const objectTop = prevY;
        const objectWidth = 50;

        const isXOverlap = positionX + objectWidth >= playerLeft && positionX <= playerRight;
        const isYOverlap = objectBottom >= playerTop && objectTop <= playerBottom;

        if (isXOverlap && isYOverlap && !caught) {
          setCaught(true);
          setTimeout(() => onCatch(type, positionX, prevY, id), 0); // Ensures only one call per object
          return 9999;
        }

        return prevY + speed;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [speed, gameOver, caught, onCatch, type, positionX, id, playerPosition]);

  return (
    <img
      src={objectImage} 
      alt={type}
      style={{
        position: "absolute",
        top: `${positionY}px`,
        left: `${positionX}px`,
        width: "50px",
        height: "50px",
        objectFit: "contain",
        display: caught || (positionY >= 500 && type === "product") ? "none" : "block",
      }}
    />
  );
};

export default FallingObject;
