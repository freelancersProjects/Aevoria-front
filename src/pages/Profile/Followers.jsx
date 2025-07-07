import React, { useState } from 'react';
import './Followers.scss';

const mockFollowers = [
  { id: 1, name: 'Luca Delarue', avatar: 'https://i.pravatar.cc/100?img=1', isFollowing: true },
  { id: 2, name: 'Mila Stone', avatar: 'https://i.pravatar.cc/100?img=2', isFollowing: false },
  { id: 3, name: 'Eliot Hawke', avatar: 'https://i.pravatar.cc/100?img=3', isFollowing: true },
  { id: 4, name: 'Ayla Moon', avatar: 'https://i.pravatar.cc/100?img=4', isFollowing: false },
];

const Followers = () => {
  const [followers, setFollowers] = useState(mockFollowers);

  const handleToggleFollow = (id) => {
    setFollowers(followers => followers.map(f => f.id === id ? { ...f, isFollowing: !f.isFollowing } : f));
  };
  const handleRemove = (id) => {
    setFollowers(followers => followers.filter(f => f.id !== id));
  };

  return (
    <div className="followers-page">
      <h2>Mes followers</h2>
      <div className="followers-list">
        {followers.map(f => (
          <div className="follower-card" key={f.id}>
            <img src={f.avatar} alt={f.name} className="avatar" />
            <div className="info">
              <span className="name">{f.name}</span>
            </div>
            <div className="actions">
              <button className="follow-btn" onClick={() => handleToggleFollow(f.id)}>
                {f.isFollowing ? 'Se désabonner' : "Suivre"}
              </button>
              <button className="remove-btn" onClick={() => handleRemove(f.id)}>
                Retirer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers; 