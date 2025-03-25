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
const LEADERBOARD_URL = "https://codedefenders.ita.voco.ee/api/leaderboard";  // Kasutame siin lihtsalt relatiivset URL-i
const SUBMIT_SCORE_URL = "https://codedefenders.ita.voco.ee/api/submit-score";  // Kasutame siin lihtsalt relatiivset URL-i

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(LEADERBOARD_URL);
      if (!response.ok) throw new Error("Failed to load leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Leaderboard error:", error);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Ask for player's name
  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (storedName) {
      setPlayerName(storedName);
    }
  }, []);

  const handleNameSubmit = () => {
    if (playerName.trim()) {
      localStorage.setItem("playerName", playerName);
      setGameStarted(true);
    } else {
      alert("Please enter a valid name");
    }
  };

  // Submit score to backend
  const submitScore = async (name, score) => {
    try {
      const response = await fetch(SUBMIT_SCORE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });

      if (!response.ok) throw new Error("Failed to submit score");
      console.log("Score submitted successfully");
      fetchLeaderboard(); // Refresh leaderboard
    } catch (error) {
      console.error("Error submitting score:", error);
      setError("Failed to submit score");
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
        overflow: "hidden", // Vältida liigset kerimist
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!gameStarted ? (
        <div
          className="start-popup"
          style={{
            backgroundImage: `url(${WarningImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "90%", // Väldi liiga suurt suurust
            maxWidth: "500px", // Maksimum suurus
            height: "auto",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2em", color: "white" }}>DONT CATCH A VIRUS</h1>
          <p style={{ color: "black", fontSize: "1.2em" }}>
            Avoid catching viruses and scams and watch out for dropping too many products!
          </p>

          <div className="game-icons" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <div><img src={appleImage} alt="Product" style={{ width: "60px" }} /><p>✅</p></div>
            <div><img src={tvImage} alt="Product" style={{ width: "60px" }} /><p>✅</p></div>
            <div><img src={virus1} alt="Virus" style={{ width: "60px" }} /><p>❌</p></div>
            <div><img src={scamImage} alt="Scam" style={{ width: "60px" }} /><p>❌</p></div>
            <div><img src={virus} alt="Virus" style={{ width: "60px" }} /><p>❌</p></div>
            <div><img src={Youareanidiot} alt="Scam" style={{ width: "60px" }} /><p>❌</p></div>
          </div>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            style={{
              padding: "10px",
              fontSize: "16px",
              marginTop: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "80%",
            }}
          />
          <button
            className="start-button"
            onClick={handleNameSubmit}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ffcc00",
              color: "black",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <GameBoard setGameStarted={setGameStarted} submitScore={submitScore} playerName={playerName} />
      )}

      {/* Leaderboard display */}
      <div
        className="leaderboard"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "white",
          fontSize: "14px",
          maxWidth: "90%",
          textAlign: "left",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontSize: "16px" }}>Leaderboard</h2>
        {loading ? (
          <p>Loading leaderboard...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {leaderboard.map((entry, index) => (
              <li key={index} style={{ fontSize: "14px", margin: "2px 0" }}>
                {entry.name}: {entry.score} points
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;