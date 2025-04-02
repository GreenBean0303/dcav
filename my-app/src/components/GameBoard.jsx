import React, { useState, useEffect } from "react";
import Player from "./Player";
import FallingObject from "./FallingObject";
import Hearts from "./Hearts";
import PauseMenu from "./PauseMenu";
import "../App.css";
import windowsXP from "../assets/WindowsXP.png";

const GameBoard = ({ setGameStarted, playerName, submitScore }) => {  // Change submitscore to submitScore
  const [position, setPosition] = useState(225);
  const [fallingObjects, setFallingObjects] = useState([]);
  const [droppedItems, setDroppedItems] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Pause toggle logic
  const togglePause = () => setPaused((prev) => !prev);

  // Reset game state to restart
  const handleRestart = () => {
    setFallingObjects([]);
    setDroppedItems(0);
    setHearts(5);
    setScore(0);
    setPaused(false);
    setGameOver(false);
  };

  // Exit game and go back to main screen
  const handleExit = () => {
    setPaused(false);
    setGameStarted(false);
  };

  // Start generating falling objects
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

  // Game over conditions based on dropped items or hearts
  useEffect(() => {
    if (droppedItems >= 10 || hearts <= 0) {
      setGameOver(true);
      setTimeout(() => setGameStarted(false), 3000);
    }
  }, [droppedItems, hearts, setGameStarted]);

  // Submit score when game is over
  useEffect(() => {
    if (gameOver) {
      submitScore(playerName, score);  // Make sure submitScore is called
    }
  }, [gameOver, playerName, score, submitScore]);

  // Handle catching a falling object
  const handleCatch = (type, objectX, objectY, id, wasCaught) => {
    if (paused || gameOver) return;

    setFallingObjects((prev) => prev.filter((obj) => obj.id !== id));

    if (type === "product") {
      if (wasCaught) {
        setScore((prev) => prev + 5); // Increment score when product is caught
      } else {
        setDroppedItems((prev) => prev + 1); // Increment dropped items counter
      }
    } else if ((type === "virus" || type === "scam") && wasCaught) {
      setHearts((prev) => Math.max(prev - 1, 0)); // Lose a heart if virus/scam is caught
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

      {/* Render falling objects */}
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

      {/* Pause button */}
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

      {/* Pause menu display */}
      {paused && <PauseMenu onResume={togglePause} onRestart={handleRestart} onExit={handleExit} />}

      {/* Game over screen */}
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