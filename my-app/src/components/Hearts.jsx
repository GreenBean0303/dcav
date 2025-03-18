import React from "react";

const Hearts = ({ lives }) => {
  return (
    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
      {"❤️".repeat(Math.max(0, lives))} {/* Ensure lives is at least 0 */}
    </div>
  );
};

export default Hearts;
