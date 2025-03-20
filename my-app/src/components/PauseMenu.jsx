import React from "react";

const PauseMenu = ({ onResume, onRestart, onExit }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h2>⏸️ Game Paused</h2>
    <button onClick={onResume}>Resume</button>
    <button onClick={onRestart} style={{ margin: "5px" }}>
      Restart
    </button>
    <button onClick={onExit} style={{ backgroundColor: "#d9534f", color: "white" }}>
      Exit to Menu
    </button>
  </div>
);

export default PauseMenu;