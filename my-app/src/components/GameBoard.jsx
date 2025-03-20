import React, { useState, useEffect } from "react";
import Player from "./Player";
import FallingObject from "./FallingObject";
import Hearts from "./Hearts";
import PauseMenu from "./PauseMenu";
import "../App.css";
import windowsXP from "../assets/WindowsXP.png";

const GameBoard = ({ setGameStarted }) => {
  const [position, setPosition] = useState(225);
  const [fallingObjects, setFallingObjects] = useState([]);
  const [droppedItems, setDroppedItems] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const togglePause = () => setPaused((prev) => !prev);
  const handleRestart = () => {
    setFallingObjects([]);
    setDroppedItems(0);
    setHearts(5);
    setScore(0);
    setPaused(false);
    setGameOver(false);
  };

  const handleExit = () => {
    setPaused(false);
    setGameStarted(false);
  };

  useEffect(() => {
    if (paused || gameOver) return;

    const interval = setInterval(() => {
      setFallingObjects((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          type: Math.random() < 0.2 ? "virus" : Math.random() < 0.4 ? "scam" : "product",
          positionX: Math.random() * 550,
          positionY: 0,
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [paused, gameOver]);

  useEffect(() => {
    if (droppedItems >= 10 || hearts <= 0) {
      setGameOver(true);
      setTimeout(() => setGameStarted(false), 3000);
    }
  }, [droppedItems, hearts, setGameStarted]);

  // Scores, health and dropped items

  const handleCatch = (type, objectX, objectY, id, wasCaught) => {
    if (paused || gameOver) return;

    setFallingObjects((prev) => prev.filter((obj) => obj.id !== id));

    if (type === "product") {
      if (wasCaught) {
        setScore((prev) => prev + 5); 
      } else {
        setDroppedItems((prev) => prev + 1); 
      }
    } else if ((type === "virus" || type === "scam") && wasCaught) {
      setHearts((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className={`game-container ${gameOver ? "game-over" : ""}`} style={{
        width: "600px",
        height: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage: `url("${windowsXP}")`,
        backgroundSize: "cover",
        border: "2px solid black",
        overflow: "hidden",
      }}>
      <h2 style={{ position: "absolute", top: "10px", right: "10px", color: "white" }}>
        Score: {score} | Dropped: {droppedItems} / 10
      </h2>
      <Hearts lives={hearts} />
      <Player position={position} setPosition={setPosition} />

      {fallingObjects.map((obj) => (
        <FallingObject
          key={obj.id}
          type={obj.type}
          positionX={obj.positionX}
          onCatch={handleCatch}
          id={obj.id}
          playerPosition={position}
          setScore={setScore}
          setHearts={setHearts}
          setDroppedItems={setDroppedItems}
          gameOver={gameOver}
        />
      ))}

      <button
        onClick={togglePause}
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "5px 15px",
          backgroundColor: "#ffcc00",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {paused ? "Resume" : "Pause"}
      </button>

      {paused && <PauseMenu onResume={togglePause} onRestart={handleRestart} onExit={handleExit} />}

      {gameOver && (
        <div className="game-over-screen" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "red",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}>
          <h1>{hearts <= 0 ? "You Lost All Hearts! Game Over!" : "Too Many Items Dropped!"}</h1>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
