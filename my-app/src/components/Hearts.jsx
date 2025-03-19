import React from "react";

const Hearts = ({ lives, points }) => {
  return (
    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
      {"❤️".repeat(Math.max(0, lives))}
      <div style={{ marginTop: "10px", color: "white", fontWeight: "bold" }}>
        Points: {points}
      </div>
    </div>
  );
};

export default Hearts;

