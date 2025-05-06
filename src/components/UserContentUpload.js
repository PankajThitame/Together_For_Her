import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/userContentUpload.css";

const UserContentUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedBy, setUploadedBy] = useState(""); // Capture uploader name
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Track upload status
  const navigate = useNavigate();

  // Handle File Change and Preview
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (
        selectedFile.type.startsWith("image") ||
        selectedFile.type.startsWith("video")
      ) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !file || !uploadedBy) {
      alert("Please provide a title, uploader name, and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("uploadedBy", uploadedBy); // Capture uploader's name
    formData.append("uploadTime", new Date().toISOString()); // Set upload time

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:9090/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Upload response:", response.data);
      setUploadSuccess(true); // Set upload success flag
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Reset Form for Upload Again
  const handleUploadAgain = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setUploadedBy("");
    setPreview(null);
    setUploadSuccess(false);
  };

  // Redirect to Home Page
  const handleGoHome = () => {
    navigate("/");
  };

  // Thank You Page
  if (uploadSuccess) {
    return (
      <div className="thank-you-container">
        <h2>🎉 Thank You for Your Contribution!</h2>
        <p>Your content has been uploaded successfully.</p>
        <div className="thank-you-actions">
          <button onClick={handleUploadAgain} className="upload-again-btn">
            Upload Again
          </button>
          <button onClick={handleGoHome} className="go-home-btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Upload Form
  return (
    <div className="upload-card">
      <h2 className="upload-title">Upload Your Content</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="upload-input"
        />

        <textarea
          placeholder="Enter description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="upload-textarea"
        />

        <input
          type="text"
          placeholder="Enter your name"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
          required
          className="upload-input"
        />

        <input
          type="file"
          accept="*/*"
          onChange={handleFileChange}
          required
          className="upload-file-input"
        />

        {preview && (
          <div className="upload-preview">
            {file.type.startsWith("image") ? (
              <img src={preview} alt="Preview" />
            ) : file.type.startsWith("video") ? (
              <video controls>
                <source src={preview} type={file.type} />
              </video>
            ) : (
              <p>File selected: {file.name}</p>
            )}
          </div>
        )}

        <button type="submit" className="upload-button" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UserContentUpload;
