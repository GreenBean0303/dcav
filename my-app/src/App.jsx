import React, { useState, useEffect } from "react";
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

// Server URL for leaderboard and submitting scores
const LEADERBOARD_URL = "https://codedefenders.ita.voco.ee/api/leaderboard";
const SUBMIT_SCORE_URL = "https://codedefenders.ita.voco.ee/api/submit-score";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    fetch(LEADERBOARD_URL)
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch((error) => console.error("Error fetching leaderboard:", error));
  }, []);

  // Ask for the player's name on first render or use saved name
  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (storedName) {
      setPlayerName(storedName);
    } else {
      let name = prompt("Enter your name");
      while (!name) {
        name = prompt("Name is required. Please enter your name");
      }
      localStorage.setItem("playerName", name); // Save name in localStorage
      setPlayerName(name);
    }
  }, []);

  // Submit score to the backend API
  const submitScore = async (name, score) => {
    try {
      const response = await fetch(SUBMIT_SCORE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });

      const data = await response.json();
      console.log("Result sent:", data);

      // Re-fetch the leaderboard after submitting the score
      const leaderboardResponse = await fetch(LEADERBOARD_URL);
      const leaderboardData = await leaderboardResponse.json();
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error sending score:", error);
    }
  };

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
          <h1 style={{ color: "white", fontSize: "3em" }}>DONT CATCH A VIRUS</h1>
          <p style={{ color: "black", fontSize: "2em" }}>
            Avoid catching viruses and scams and watch out for dropping too many products!
          </p>

          <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={appleImage}
                alt="Product"
                style={{ width: "80px", height: "80px" }}
              />
              <p>✅</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={tvImage}
                alt="Product"
                style={{ width: "80px", height: "80px" }}
              />
              <p>✅</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={virus1}
                alt="Virus"
                style={{ width: "80px", height: "80px" }}
              />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={scamImage}
                alt="Scam"
                style={{ width: "80px", height: "80px" }}
              />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={virus}
                alt="Virus"
                style={{ width: "80px", height: "80px" }}
              />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={Youareanidiot}
                alt="Scam"
                style={{ width: "80px", height: "80px" }}
              />
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
        <GameBoard
          setGameStarted={setGameStarted}
          submitScore={submitScore} // Use correct prop name
          playerName={playerName}
        />
      )}

      {/* Leaderboard display */}
      <div style={{ position: "absolute", bottom: "10px", left: "10px", color: "white" }}>
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.name}: {entry.score} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
