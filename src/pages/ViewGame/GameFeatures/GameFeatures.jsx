import React from 'react';
import './GameFeatures.scss';
import UserIcon from '../../../assets/svg/user.svg';

const GameFeatures = ({ features = [], requirements = {} }) => {
  return (
    <div className="game-features">
      <div className="container">
        {/* Game Features Section */}
        <div className="features-section">
          <h2 className="section-title">Game features</h2>
          <div className="features-badges">
            {features.length > 0 ? features.map((feature, i) => (
              <div className="feature-badge" key={i}>
                <div className="feature-icon">
                  <img src={UserIcon} alt="User icon" />
                </div>
                <span>{feature}</span>
              </div>
            )) : <span>Aucune feature disponible</span>}
          </div>
        </div>

        {/* System Requirements Section */}
        <div className="requirements-section">
          <h2 className="section-title">System Requirements</h2>
          <div className="requirements-content">
            <div className="minimum-requirements">
              <h3 className="requirements-subtitle">Minimum:</h3>
              <div className="platform-requirements">
                {requirements.platforms && requirements.platforms.length > 0 ? requirements.platforms.map((platform, idx) => (
                  <div className="platform" key={idx}>
                    <h4 className="platform-title">{platform.name}</h4>
                    {platform.items && platform.items.length > 0 ? platform.items.map((item, i) => (
                      <div className="requirement-item" key={i}>
                        <span className="requirement-label">{item.label}:</span>
                        <span className="requirement-value">{item.value}</span>
                      </div>
                    )) : <span>Aucune information</span>}
                  </div>
                )) : <span>Aucune configuration requise renseignée</span>}
              </div>
              <button className="read-more-btn">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameFeatures;
