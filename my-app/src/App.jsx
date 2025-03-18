import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import WindowsXP from "./assets/WindowsXP.png";
import WarningImage from "./assets/WarningImage.png"

function App() {
  // State to toggle between the start menu and the game
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div
    style={{
      backgroundImage: `url(${WindowsXP})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
      position: "relative" // Enables layering for overlay
    }}
    >
      {!gameStarted ? (
        <div
        style={{
          backgroundImage: `url(${WarningImage})`,
          backgroundSize: "contain", // Ensures the image scales properly
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "500px", // Match the warning image dimensions
          height: "150px", // Adjust based on the image size
          position: "absolute",
          top: "50%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -50%)", // Perfect centering trick
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px"
        }}
        
        >
          <h1 style={{ color: "white", fontSize: "3em" }}>
            Welcome to the Shopping Game! 🛒
          </h1>
          <p style={{color: 'green'}}>Avoid catching viruses and make sure to not drop too many items!</p>
          <button
            onClick={() => setGameStarted(true)} // Start the game when clicked
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ffcc00",
              color: "black",
              fontWeight: "bold"
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        // Show the game board if the game has started
        <GameBoard />
      )}
    </div>
  );
}

export default App;