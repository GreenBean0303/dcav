import React from "react";

const Hearts = ({ lives }) => {
  return (
    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
      {"❤️".repeat(lives)}
    </div>
  );
};

export default Hearts;
