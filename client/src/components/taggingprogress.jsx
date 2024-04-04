import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const TaggingProgress = ({ totalSentences, completedSentences }) => {
  const percentage = totalSentences > 0 ? (completedSentences / totalSentences) * 100 : 0;

  if (completedSentences === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
    <span style={{ marginRight: "10px" }}>Progress:</span>
    <ProgressBar now={percentage} label={`${completedSentences}/${totalSentences}`} variant="info" />
  </div>
  
  );
};

export default TaggingProgress;
