const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Allow requests from React app
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// 🧠 In-memory leaderboard (resets when server restarts)
let leaderboard = [];

// 🎯 Submit score
app.post("/api/submit-score", (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid name or score" });
  }

  // Optional: check if player exists and update score if higher
  const existing = leaderboard.find(player => player.name === name);
  if (existing) {
    if (score > existing.score) {
      existing.score = score;
    }
  } else {
    leaderboard.push({ name, score });
  }

  console.log("Score submitted:", name, score);
  res.status(201).json({ message: "Score added" });
});

// 🏆 Get leaderboard
app.get("/api/leaderboard", (req, res) => {
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
  res.json(sorted);
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
