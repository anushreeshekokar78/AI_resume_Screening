// src/components/SubmitButton.jsx
import React from 'react';

const SubmitButton = ({ onClick, loading }) => {
  return (
    <div className="submit-button">
      <button
        onClick={onClick}
        disabled={loading}
        className="btn-submit"
      >
        {loading ? (
          <>
            <svg className="spinner" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Screen Resume</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SubmitButton;