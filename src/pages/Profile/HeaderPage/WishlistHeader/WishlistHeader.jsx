import React from 'react';
import './WishlistHeader.scss';

const WishlistHeader = () => {
  const wishlistGames = [
    { id: 1, title: 'Cyberpunk 2077', type: 'RPG', playtime: '15h'},
    { id: 2, title: 'The Witcher 3', type: 'RPG', playtime: '23h'},
    { id: 3, title: 'Elden Ring', type: 'Action RPG', playtime: '31h'},
    { id: 4, title: 'Horizon Zero Dawn', type: 'Action Adventure', playtime: '15h'},
    { id: 5, title: 'Red Dead Redemption 2', type: 'Action Adventure', playtime: '20h'}
  ];

  return (
    <div className="wishlist-header">
      <h1>Wishlist</h1>
      
      <div className="wishlist-games">
        {wishlistGames.map((game) => (
          <div key={game.id} className="game-item">
            <img src={game.image} alt={game.title} className="game-image" />
            <div className="game-info">
              <h3>{game.title}</h3>
              <div className="game-meta">
                <span className="game-tag">{game.type}</span>
                <span className="playtime">{game.playtime}</span>
              </div>
            </div>
            <button className="expand-btn" aria-label="Expand game details">›</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistHeader;