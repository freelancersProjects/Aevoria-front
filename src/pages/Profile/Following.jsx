import React, { useState } from 'react';
import './Following.scss';

const mockFollowing = [
  { id: 1, name: 'Luna Ray', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 2, name: 'Kai Rivers', avatar: 'https://i.pravatar.cc/100?img=6' },
  { id: 3, name: 'Theo Knight', avatar: 'https://i.pravatar.cc/100?img=7' },
  { id: 4, name: 'Jaron Cruz', avatar: 'https://i.pravatar.cc/100?img=8' },
];

const Following = () => {
  const [following, setFollowing] = useState(mockFollowing);

  const handleUnfollow = (id) => {
    setFollowing(following => following.filter(f => f.id !== id));
  };

  return (
    <div className="following-page">
      <h2>Mes abonnements</h2>
      <div className="following-list">
        {following.map(f => (
          <div className="following-card" key={f.id}>
            <img src={f.avatar} alt={f.name} className="avatar" />
            <div className="info">
              <span className="name">{f.name}</span>
            </div>
            <div className="actions">
              <button className="unfollow-btn" onClick={() => handleUnfollow(f.id)}>
                Se désabonner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following; 