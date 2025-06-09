import React from 'react';
import './GameFeatures.scss';
import UserIcon from '../../../assets/svg/user.svg';

const GameFeatures = () => {
  return (
    <div className="game-features">
      <div className="container">
        {/* Game Features Section */}
        <div className="features-section">
          <h2 className="section-title">Game features</h2>
          <div className="features-badges">
            <div className="feature-badge">
              <div className="feature-icon">
                <img src={UserIcon} alt="User icon" />
              </div>
              <span>Coopération en ligne</span>
            </div>
            <div className="feature-badge">
              <div className="feature-icon">
                <img src={UserIcon} alt="User icon" />
              </div>
              <span>Coopération en ligne</span>
            </div>
            <div className="feature-badge">
              <div className="feature-icon">
                <img src={UserIcon} alt="User icon" />
              </div>
              <span>Coopération en ligne</span>
            </div>
          </div>
        </div>

        {/* System Requirements Section */}
        <div className="requirements-section">
          <h2 className="section-title">System Requirements</h2>
          
          <div className="requirements-content">
            <div className="minimum-requirements">
              <h3 className="requirements-subtitle">Minimum:</h3>
              
              <div className="platform-requirements">
                <div className="platform">
                  <h4 className="platform-title">Windows</h4>
                  <div className="requirement-item">
                    <span className="requirement-label">Requires a 64-bit processor and operating system</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">OS:</span>
                    <span className="requirement-value">Win 10 64 Bit</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Processor:</span>
                    <span className="requirement-value">Intel i5-4690 / Intel i3-10100 / AMD Ryzen 5 1200</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Memory:</span>
                    <span className="requirement-value">8 GB RAM</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Graphics:</span>
                    <span className="requirement-value">NVIDIA GTX 1050 / AMD RX 460 / Intel Arc A380</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">DirectX:</span>
                    <span className="requirement-value">Version 12</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Storage:</span>
                    <span className="requirement-value">20 GB available space</span>
                  </div>
                </div>

                <div className="platform">
                  <h4 className="platform-title">Mac</h4>
                  <div className="requirement-item">
                    <span className="requirement-label">OS:</span>
                    <span className="requirement-value">Sequoia</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Processor:</span>
                    <span className="requirement-value">M1 8 Core</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Memory:</span>
                    <span className="requirement-value">8 GB RAM</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Graphics:</span>
                    <span className="requirement-value">M1</span>
                  </div>
                  <div className="requirement-item">
                    <span className="requirement-label">Storage:</span>
                    <span className="requirement-value">25 GB available space</span>
                  </div>
                </div>
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
