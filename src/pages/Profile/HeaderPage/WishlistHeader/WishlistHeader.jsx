import React from 'react';
import './WishlistHeader.scss';

const WishlistHeader = ({ games }) => {
  return (
    <div className="wishlist-section">
      <div className="wishlist-header">
        <i className="heart-icon">❤️</i>
        <span>Wishlist</span>
      </div>
      
      <div className="games-list">
        {games.map((game, index) => (
          <div className="game-item" key={index}>
            <div className="game-info">
              <div className="game-title">{game.title}</div>
            </div>
            <i className="chevron-icon">›</i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistHeader;
