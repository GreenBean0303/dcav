const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express();
const PORT = 4000;

// Use CORS to allow requests from any origin or specify your client URL
app.use(cors({
  origin: "http://localhost:3000", // Allow your front-end URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware to parse JSON
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
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error proxying leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
