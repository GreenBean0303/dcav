import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import WindowsXP from "./assets/WindowsXP.png";
import WarningImage from "./assets/WarningImage.png";
import "./App.css"; // Import styles for glitch effects

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div
      className={`app-container ${gameStarted ? "" : "start-screen"}`}
      style={{
        backgroundImage: `url(${WindowsXP})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      {!gameStarted ? (
        <div
          style={{
            backgroundImage: `url(${WarningImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "500px",
            height: "150px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1 style={{ color: "white", fontSize: "3em" }}>
            Welcome to the Shopping Game! 🛒
          </h1>
          <p style={{ color: "red", fontSize: "2em" }}>
            Avoid catching viruses and make sure not to drop too many items!
          </p>
          <button
            onClick={() => setGameStarted(true)}
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ffcc00",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <GameBoard setGameStarted={setGameStarted} />
      )}
    </div>
  );
}

export default App;