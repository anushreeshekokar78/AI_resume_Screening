// src/components/ResultCard.jsx
import React from 'react';

const ResultCard = ({ result }) => {
 const { match_score, skills_found, missing_skills } = result;
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'score-green';
    if (score >= 60) return 'score-yellow';
    return 'score-red';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'progress-green';
    if (score >= 60) return 'progress-yellow';
    return 'progress-red';
  };

  const getScoreMessage = (score) => {
    if (score >= 70) {
      return "Excellent match! This candidate aligns well with the requirements.";
    } else if (score >= 50) {
      return "Moderate match. Some skills need development.";
    } else {
      return "Low match. Significant skill gaps identified.";
    }
  };

  return (
    <div>
      <h3 className="results-title">Screening Results</h3>
      
      <div className="score-card">
        <div className="score-header">
          <span className="score-label">Overall Match</span>
          <span className={`score-value ${getScoreColor(match_score)}`}>
            {match_score}%
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressColor(match_score)}`}
            style={{ width: `${match_score}%` }}
          />
        </div>
        <p className="score-message">{getScoreMessage(match_score)}</p>
      </div>

      <div className="skills-grid">
        <div className="skill-card">
          <div className="skill-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#38a169' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4>Extracted Skills</h4>
          </div>
          <div className="skill-tags">
            {skills_found && skills_found.length > 0 ? (
              skills_found.map((skill, index) => (
                <span key={index} className="skill-tag tag-green">
                  {skill}
                </span>
              ))
            ) : (
              <p className="no-skills">No skills extracted</p>
            )}
          </div>
        </div>

        <div className="skill-card">
          <div className="skill-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#dd6b20' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4>Missing Skills</h4>
          </div>
          <div className="skill-tags">
            {missing_skills && missing_skills.length > 0 ? (
              missing_skills.map((skill, index) => (
                <span key={index} className="skill-tag tag-orange">
                  {skill}
                </span>
              ))
            ) : (
              <p className="no-skills" style={{ color: '#38a169' }}>Great! No critical skills missing</p>
            )}
          </div>
        </div>
      </div>

      {missing_skills && missing_skills.length > 0 && (
        <div className="recommendation-box">
          <div className="recommendation-icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="recommendation-content">
            <p>Recommendation</p>
            <p>Focus on developing the missing skills highlighted above to improve the match score. Consider online courses or certifications in these areas.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;