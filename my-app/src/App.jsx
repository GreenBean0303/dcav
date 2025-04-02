import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import "./App.css";
import WindowsXP from "./assets/WindowsXP.png";
import WarningImage from "./assets/WarningImage.png";
import virus1 from "./assets/ILOVEYOUvirus.png";
import virus from "./assets/virus.png";
import Youareanidiot from "./assets/Youareanidiot.png";
import appleImage from "./assets/apple.png";
import tvImage from "./assets/tv.png";
import scamImage from "./assets/pop-up.png";

// Define URLs for leaderboard and score submission
const LEADERBOARD_URL = "http://localhost:3001/leaderboard"; // Replace with actual URL
const SUBMIT_SCORE_URL = "http://localhost:3001/submit-score"; // Replace with actual URL

// Import assets
/*import WindowsXP from "/static/media/WindowsXP.c0757fc15639d259a773.png";
import WarningImage from "/static/media/pop-up.f3ca457b0a8afb444755.png";
import virus1 from "/static/media/ILOVEYOUvirus.46d2e492aa125a818ded.png";
import virus from "/static/media/virus.dcbaf472c6e77482d83e.png";
import Youareanidiot from "/static/media/player.4e775f7a481d84399941.png";
import appleImage from "/static/media/apple.0720c39fe39c0afa0956.png";
import tvImage from "/static/media/tv.8f84fb63aa7ef0a65dff.png";*/


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000); // 5 seconds timeout

    fetch(LEADERBOARD_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Leaderboard data fetched:", data);
        setLeaderboard(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Request timed out");
        } else {
          console.error("Error fetching leaderboard:", error);
          setError("Failed to load leaderboard");
        }
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Retrieve player's name from localStorage
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

      if (!response.ok) {
        throw new Error("Failed to submit score");
      }

      const data = await response.json();
        console.log("🔁 Backend response:", data); // Debug line
        alert(`Backend says: ${data.message}`);


      // Re-fetch leaderboard after submitting score
      const leaderboardResponse = await fetch(LEADERBOARD_URL);
      const leaderboardData = await leaderboardResponse.json();
      setLeaderboard(leaderboardData);
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
        overflow: "hidden",
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
            width: "90%",
            maxWidth: "500px",
            height: "auto",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3em", color: "black" }}>DONT CATCH A VIRUS</h1>
          <p style={{ color: "black", fontSize: "1.2em" }}>
            Avoid catching viruses and scams and watch out for dropping too many products!
            Use LEFT arrow and RIGHT arrow to move the character.
          </p>

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
              <img src={virus} alt="Virus" style={{ width: "80px", height: "80px" }} />
              <p>❌</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={Youareanidiot} alt="Scam" style={{ width: "80px", height: "80px" }} />
              <p>❌</p>
            </div>
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
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "white",
          fontSize: "18px",
        }}
      >
        <h2>Leaderboard</h2>
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