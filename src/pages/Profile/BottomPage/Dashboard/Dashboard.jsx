import React from 'react';
import './Dashboard.scss';

const Dashboard = ({ profile }) => {
  return (
    <div className="profile-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Profile Dashboard</h1>
        <div className="activity-status">
          <span className="status-dot active"></span>
          <span>Active</span>
        </div>
      </div>
      
      <div className="friends-bar">
        <div className="avatars-group">
          {profile.friends.slice(0, 3).map((friend, index) => (
            <img 
              key={index} 
              className="friend-avatar" 
              src={friend.image} 
              alt={friend.name} 
              title={friend.name} 
            />
          ))}
          <div className="more-friends">
            +10 Others
          </div>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="icon-wallet"></i>
          </div>
          <div className="stat-name">Total spent</div>
          <div className="stat-value">{profile.totalSpent}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="icon-money"></i>
          </div>
          <div className="stat-name">Wallet</div>
          <div className="stat-value">{profile.wallet}</div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '30%' }}></div>
            </div>
            <div className="progress-text">Top up wallet</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="icon-booking"></i>
          </div>
          <div className="stat-name">Bookings</div>
          <div className="stat-info">Level {profile.bookings.level}</div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${profile.bookings.completed}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="icon-artifact"></i>
          </div>
          <div className="stat-name">Artifact Lost</div>
          <div className="stat-detail">
            <span>{profile.artifactLost.quests} quests</span>
            <span className="separator">|</span>
            <span>{profile.artifactLost.claimed} claimed</span>
          </div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${profile.artifactLost.percentage}%` }}></div>
            </div>
            <div className="progress-text">See all quests</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
