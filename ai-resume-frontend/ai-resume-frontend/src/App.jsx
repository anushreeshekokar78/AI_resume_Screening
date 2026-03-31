// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import UploadBox from './components/UploadBox';
import JobDescriptionInput from './components/JobDescriptionInput';
import SubmitButton from './components/SubmitButton';
import ResultCard from './components/ResultCard';

const App = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
  };

  const handleJobDescriptionChange = (text) => {
    setJobDescription(text);
    setError('');
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a resume (PDF or DOCX)');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001/match';
      
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to analyze resume. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <div className="card-content">
          <div className="header">
            <h1>AI Resume Screening</h1>
            <p>Upload a resume and paste a job description to get instant AI-powered analysis</p>
          </div>

          <div className="form-section">
            <label className="form-label">Upload Resume</label>
            <UploadBox onFileSelect={handleFileSelect} selectedFile={file} />
          </div>

          <div className="form-section">
            <label className="form-label">Job Description</label>
            <JobDescriptionInput 
              value={jobDescription} 
              onChange={handleJobDescriptionChange} 
            />
          </div>

          {error && (
            <div className="error-message">
              <p className="error-text">{error}</p>
            </div>
          )}

          <SubmitButton onClick={handleSubmit} loading={loading} />
        </div>

        {result && (
          <div className="results-section">
            <ResultCard result={result} />
          </div>
        )}

        <div className="footer">
          <p className="footer-text">Supports PDF and DOCX files • AI-powered skill matching</p>
        </div>
      </div>
    </div>
  );
};

export default App;