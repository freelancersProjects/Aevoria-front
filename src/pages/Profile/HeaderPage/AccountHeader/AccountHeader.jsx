import React from 'react';
import './AccountHeader.scss';

const AccountHeader = () => {
    const user = {
      name: 'Zara Lavigne',
      username: 'zara_gamerX',
      avatarUrl: '../../../../assets/images/image-bg-section.png',
      followers: 1200, 
      following: 300,
      level: 3
    };
  
    const friends = [
      { name: 'Eliot Hawke', avatarUrl: '../../../../assets/images/photo-test.webp' },
      { name: 'Mila Stone', avatarUrl: '../../../../assets/images/photo-test.webp' },
      { name: 'Jaron Cruz', avatarUrl: '../../../../assets/images/photo-test.webp' },
      { name: 'Ayla Moon', avatarUrl: '../../../../assets/images/photo-test.webp' },
      { name: 'Kai Rivers', avatarUrl: '../../../../assets/images/photo-test.webp' },
      { name: 'Luna Ray', avatarUrl: '../../../../assets/images/photo-test.webp' },
      { name: 'Theo Knight', avatarUrl: '../../../../assets/images/photo-test.webp' }
    ];

  return (
    <div className="account-header">
      <div className="banner">
        <img 
          className="banner-image" 
          src="../../../../../assets/images/image-bg-section.png" 
          alt="Cyberpunk City Skyline" 
        />
      </div>
      
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={user.avatarUrl} alt={user.username} />
        </div>
        
        <div className="profile-details">
          <div className="user-name">
            <h1>{user.name} {user.verified && <span className="verified-badge">✓</span>}</h1>
            <span className="username">@{user.username}</span>
          </div>
          
          <div className="user-stats">
            <div className="followers">
              <span className="count">{user.followers}</span> followers
            </div>
            <div className="following">
              <span className="count">{user.following}</span> following
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="share-btn">Share</button>
          <button className="more-btn">···</button>
        </div>
      </div>
      
      <div className="profile-dashboard">
        <h2>Profile Dashboard <span className="status-indicator active">• Active</span></h2>
        
        <div className="friends-list">
          {friends.slice(0, 5).map((friend, index) => (
            <img 
              key={index} 
              className="friend-avatar" 
              src={friend.avatarUrl} 
              alt={friend.name} 
              title={friend.name}
            />
          ))}
          {friends.length > 5 && (
            <span className="more-friends">+{friends.length - 5} others</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;


// changer le code pour mettre image de profil et nom d'utilisateur