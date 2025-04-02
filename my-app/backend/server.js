const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;
const scoresFilePath = path.join(__dirname, "scores.json");

app.use(cors());
app.use(express.json());

// Load existing scores
const loadScores = async () => {
  if (!fs.existsSync(scoresFilePath)) {
    await fs.writeFile(scoresFilePath, JSON.stringify({}));
  }
  return JSON.parse(await fs.readFile(scoresFilePath, "utf-8"));
};

// Save scores
const saveScores = async (scores) => {
  await fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2));
};

// POST /submit-score
app.post("/submit-score", (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid name or score" });
  }

  const scores = loadScores();
  const currentHigh = scores[name] || 0;

  if (score > currentHigh) {
    scores[name] = score;
    saveScores(scores);
    return res.json({
      message: "New high score!",
      highScore: score,
      isHighScore: true,
    });
  } else {
    return res.json({
      message: "Score received, but not a high score",
      highScore: currentHigh,
      isHighScore: false,
    });
  }
});

// GET /leaderboard
app.get("/leaderboard", (req, res) => {
  const scores = loadScores();
  const sorted = Object.entries(scores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Top 10
  res.json(sorted);
});

app.listen(PORT, () => {
  console.log("Server is running at http: //localhost:${PORT}");
});