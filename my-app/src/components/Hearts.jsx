import React from "react";

const Hearts = ({ lives, points }) => {
  return (
    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
      {"❤️".repeat(Math.max(0, lives))}
    </div>
  );
};

export default Hearts;
