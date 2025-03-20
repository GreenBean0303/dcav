import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import WindowsXP from "./assets/WindowsXP.png";
import WarningImage from "./assets/WarningImage.png";
import virus1 from "./assets/ILOVEYOUvirus.png";
import virus from "./assets/virus.png";
import Youareanidiot from "./assets/Youareanidiot.png";
import appleImage from "./assets/apple.png";
import tvImage from "./assets/tv.png";
import scamImage from "./assets/pop-up.png";
import "./App.css";

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
            height: "350px",
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
          <h1 style={{ color: "white", fontSize: "3em" }}>Welcome to the Shopping Game! 🛒</h1>
          <p style={{color: "red", fontSize: "2em"}}>Avoid cathing viruses and scams and watch out for dropping too many products!</p>

          <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
            <div style={{ textAlign: "center" }}>
              <img src={appleImage} alt="Product" style={{ width: "80px", height: "80px" }} />
              <p>✅</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={tvImage} alt="Product" style={{ width: "80px", height: "80px" }} />
              <p>✅</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={virus1} alt="Virus" style={{ width: "80px", height: "80px" }} />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={scamImage} alt="Scam" style={{ width: "80px", height: "80px" }} />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={virus} alt="Virus" style={{ width: "80px", height: "80px" }} />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={Youareanidiot} alt="Scam" style={{ width: "80px", height: "80px" }} />
              <p>❌</p>
            </div>
          </div>

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
