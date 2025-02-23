import React from "react";

const UploadSection = () => {
  return (
    <div style={{ border: "2px dashed #6d8f85", padding: "30px", textAlign: "center", width: "50%", borderRadius: "10px" }}>
      <p>Upload your medical report here</p>
      <p>Drag and drop</p>
      <p>OR</p>
      <button style={{ padding: "10px 20px", background: "#6d8f85", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Choose from your computer
      </button>
    </div>
  );
};

export default UploadSection;
