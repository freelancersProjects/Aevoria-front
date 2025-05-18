import React from 'react';
import './AccountHeader.scss';
import defaultBanner from '../../../../assets/images/17776072l.jpg';
import defaultProfile from '../../../../assets/images/photo-test.webp';

const AccountHeader = () => {
    const user = {
      name: 'Zara Lavigne',
      username: 'zara_gamerX',
      profilePicture: '', // Simule un profil sans image
      profileBanner: '', // Simule une bannière sans image
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

  // Utilise l'image par défaut si aucune n'est définie
  const profileImage = user.profilePicture ? user.profilePicture : defaultProfile;
  const bannerImage = user.profileBanner ? user.profileBanner : defaultBanner;

  return (
    <div className="account-header">
      <div className="banner">
        <img 
          className="banner-image" 
          src={bannerImage} 
          alt="Profile banner" 
        />
      </div>
      
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profileImage} alt={user.username} />
        </div>
        
        <div className="profile-details">
          <div className="user-name">
            <h1>{user.name}</h1>
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
        
        <div className="tabs">
          <button className="tab active">Dashboard</button>
          <button className="tab">My Orders</button>
          <button className="tab">Affiliations</button>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;


// changer le code pour mettre image de profil et nom d'utilisateur