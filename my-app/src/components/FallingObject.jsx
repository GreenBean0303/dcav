import React, { useState, useEffect } from "react";
import appleImage from "../assets/apple.png";
import tvImage from "../assets/tv.png";
import virus1 from "../assets/ILOVEYOUvirus.png";
import virus2 from "../assets/virus.png";
import virus3 from "../assets/Youareanidiot.png";
import scamImage from "../assets/pop-up.png";

// Store images in arrays for random selection
const virusImages = [virus1, virus2, virus3];
const productImages = [appleImage, tvImage];
const scamImages = [scamImage];

const FallingObject = ({ type, positionX, onCatch, id }) => {
  const [positionY, setPositionY] = useState(0);
  const speed = type === "virus" ? 3 : 2; // Viruses fall slightly faster

  // Select a random image **ONCE** and store it in state
  const [objectImage] = useState(() => {
    const imageMap = {
      product: productImages,
      virus: virusImages,
      scam: scamImages,
    };
    return imageMap[type][Math.floor(Math.random() * imageMap[type].length)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionY((prevY) => {
        if (prevY >= 500) return prevY; // Prevents infinite falling
        return prevY + speed;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [speed]);

  // Ensure collision detection happens **ONLY ONCE per object**
  useEffect(() => {
    if (positionY >= 340 && positionY <= 490) { // ✅ Only check collisions when near player
      console.log(`🚀 Object ${id} (${type}) is near the player at Y=${positionY}`);
      onCatch(type, positionX, positionY, id);
    }
  }, [positionY, type, positionX, id, onCatch]);

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
      }}
    />
  );
};

export default FallingObject;
