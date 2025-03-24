import React from 'react';
import './Affiliation.scss';

const Affiliation = ({ profile }) => {
  return (
    <div className="affiliation-container">
      <h2 className="section-title">Affiliations</h2>
      <div className="affiliation-stats">
        <div className="affiliation-card">
          <div className="affiliation-icon">
            <i className="icon-artifact"></i>
          </div>
          <div className="affiliation-detail">
            <span>{profile.artifactLost.quests} quests</span>
            <span className="separator">|</span>
            <span>{profile.artifactLost.claimed} claimed</span>
          </div>
          <div className="affiliation-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${profile.artifactLost.percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliation;
