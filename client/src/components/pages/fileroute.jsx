import React, { useState } from "react";
import { Link } from "react-router-dom";
import FileUpload from "../fileupload";

const FileRoute = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
  };

  return (
    <div>
      {/* <input type="file" onChange={handleFileUpload} accept=".txt" /> */}
      
      
      {/* <FileUpload uploadedFile={uploadedFile} /> */}
    </div>
  );
};

export default FileRoute;
// 