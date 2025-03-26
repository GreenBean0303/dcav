const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Proxy POST request to the real backend
app.post("/api/submit-score", async (req, res) => {
  try {
    const response = await fetch("https://codedefenders.ita.voco.ee/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error proxying submit-score:", error);
    res.status(500).json({ error: "Failed to submit score" });
  }
});

// Proxy GET request to leaderboard
app.get("/api/leaderboard", async (req, res) => {
  try {
    const response = await fetch("https://codedefenders.ita.voco.ee/api/leaderboard");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error proxying leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
