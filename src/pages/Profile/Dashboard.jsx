import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEllipsisH, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ProfileDashboard = () => {
  // Données du profil (normalement viendraient d'une API/state)
  const profileData = {
    username: 'Zara Lavigne',
    isVerified: true,
    description: 'Gamer Girl',
    level: 3,
    followers: '1.2k',
    following: '300',
    isActive: true,
    friends: [
      { id: 1, name: 'Zara', avatar: '/avatars/zara.jpg' },
      { id: 2, name: 'Max', avatar: '/avatars/max.jpg' },
      { id: 3, name: 'Leo', avatar: '/avatars/leo.jpg' },
      { id: 4, name: '+12 others', avatar: null }
    ],
    wishlist: [
      { id: 1, title: 'Cyberpunk 2077', progress: '1.2h' },
      { id: 2, title: 'The Witcher 3', progress: '22h' },
      { id: 3, title: 'Elden Ring', progress: '31h' },
      { id: 4, title: 'Horizon Zero Dawn', progress: '1.6h' },
      { id: 5, title: 'Red Dead Redemption 2', progress: '7h' }
    ]
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-menu">
          <div className="menu-item active">Profile</div>
          <div className="menu-item">Settings</div>
        </div>
        
        <div className="wishlist-section">
          <div className="wishlist-header">
            <FontAwesomeIcon icon={faHeart} />
            <h3>Wishlist</h3>
          </div>
          
          <div className="games-list">
            {profileData.wishlist.map(game => (
              <div key={game.id} className="game-item">
                <div className="game-title">{game.title}</div>
                <div className="game-progress">{game.progress}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="banner-image">
          {/* Image de fond futuriste */}
        </div>
        
        <div className="profile-info">
          <div className="profile-header">
            <div className="profile-avatar">
              {/* Photo de profil */}
            </div>
            
            <div className="profile-details">
              <div className="username">
                {profileData.username}
                {profileData.isVerified && 
                  <FontAwesomeIcon icon={faCheckCircle} className="verified-badge" />
                }
              </div>
              
              <div className="description">{profileData.description}</div>
              
              <div className="level-badge">Level {profileData.level}</div>
              
              <div className="stats">
                <span>{profileData.followers} followers</span>
                <span>{profileData.following} following</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="share-btn">Share</button>
              <button className="options-btn">
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </div>
          </div>
          
          <div className="dashboard-section">
            <h2>Profile Dashboard</h2>
            {profileData.isActive && <span className="active-badge">Active</span>}
            
            <div className="friends-list">
              {profileData.friends.map(friend => (
                <div key={friend.id} className="friend-avatar">
                  {friend.avatar ? 
                    <img src={friend.avatar} alt={friend.name} /> : 
                    <div className="more-friends">{friend.name}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
