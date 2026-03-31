// src/components/JobDescriptionInput.jsx
import React from 'react';

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        rows={6}
        className="jd-textarea"
      />
      <div className="char-count">
        {value.length} characters • Include key requirements and skills for better results
      </div>
    </div>
  );
};

export default JobDescriptionInput;