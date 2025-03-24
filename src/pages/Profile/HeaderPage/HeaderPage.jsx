import React from 'react';
import './HeaderPage.scss';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import AccountHeader from './AccountHeader/AccountHeader';

const HeaderPage = ({ profile }) => {
  return (
    <>
      <div className="banner">
        <div className="profile-avatar-container">
          <img className="profile-avatar" src="/path-to-avatar.jpg" alt="Profile" />
        </div>
      </div>
      
      <div className="profile-details">
        <div className="user-info">
          <h2 className="username">{profile.name} <span className="verified-badge">✓</span></h2>
          <div className="level-container">
            <span>Level {profile.level}</span>
            <div className="level-bar">
              <div className="level-progress"></div>
            </div>
          </div>
          
          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">{profile.followers}</span> followers
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.following}</span> following
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="share-btn">Share</button>
          <button className="more-btn">...</button>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
