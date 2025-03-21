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
  const [triggerCatch, setTriggerCatch] = useState(false); // Flag to safely call onCatch later

  const [objectImage] = useState(() => {
    if (type === "virus") return virusImages[Math.floor(Math.random() * virusImages.length)];
    if (type === "scam") return scamImages[0];
    return productImages[Math.floor(Math.random() * productImages.length)];
  });

  // Collision check loop
  useEffect(() => {
    if (gameOver || caught) return;

    const interval = setInterval(() => {
      setPositionY((prevY) => {
        if (prevY >= 500) {
          if (type === "product" && !caught) {
            setTriggerCatch("miss"); // Product not caught
          }
          return prevY;
        }

        // Hitbox setup
        const playerVisualWidth = 150;
        const playerHitboxWidth = 80;
        const playerHitboxHeight = 80;

        const playerBottom = 500;
        const playerTop = playerBottom - playerHitboxHeight;
        const playerLeft = playerPosition + (playerVisualWidth - playerHitboxWidth) / 2;
        const playerRight = playerLeft + playerHitboxWidth;

        const objectBottom = prevY + 40;
        const objectTop = prevY;
        const objectWidth = 40;

        const isXOverlap = positionX + objectWidth >= playerLeft && positionX <= playerRight;
        const isYOverlap = objectBottom >= playerTop && objectTop <= playerBottom;

        if (isXOverlap && isYOverlap && !caught) {
          setCaught(true);
          setTriggerCatch("caught"); // Catch!
          return 9999; // Send object off screen
        }

        return prevY + speed;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [speed, gameOver, caught, type, positionX, id, playerPosition]);

  // Safe catch/miss handling
  useEffect(() => {
    if (triggerCatch === "caught") {
      onCatch(type, positionX, positionY, id, true);
      setTriggerCatch(false);
    } else if (triggerCatch === "miss") {
      onCatch(type, positionX, positionY, id, false);
      setTriggerCatch(false);
    }
  }, [triggerCatch, onCatch, type, positionX, positionY, id]);

  return (
    <img
      src={objectImage}
      alt={type}
      style={{
        position: "absolute",
        top: `${positionY}px`,
        left: `${positionX}px`,
        width: "40px",
        height: "40px",
        objectFit: "contain",
        display: caught || (positionY >= 500 && type === "product") ? "none" : "block",
      }}
    />
  );
};

export default FallingObject;
