import React from 'react';
import './WishlistHeader.scss';
import { FaChevronRight, FaHeart } from 'react-icons/fa';

const WishlistHeader = () => {
  // Données fictives pour la wishlist
  const wishlistGames = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      type: 'Game',
      views: '1.5k'
    },
    {
      id: 2,
      title: 'The Witcher 3',
      type: 'Game',
      views: '4.0k'
    },
    {
      id: 3,
      title: 'Elden Ring',
      type: 'Game',
      views: '3.1k'
    },
    {
      id: 4,
      title: 'Horizon Zero Dawn',
      type: 'Game',
      views: '1.7k'
    },
    {
      id: 5,
      title: 'Red Dead Redemption 2',
      type: 'Game',
      views: '2.5k'
    },
    {
      id: 6,
      title: 'Hades',
      type: 'Game',
      views: '1.2k'
    },
    {
      id: 7,
      title: 'Stardew Valley',
      type: 'Game',
      views: '5.0k'
    },
    {
      id: 8,
      title: 'Hollow Knight',
      type: 'Game',
      views: '2.8k'
    },
    {
      id: 9,
      title: 'Celeste',
      type: 'Game',
      views: '3.5k'
    }
  ];

  return (
    <div className="wishlist-header">
      {/* Navigation principale */}
      <div className="main-nav">
        <div className="nav-item active">Profile</div>
        <div className="nav-item">Settings</div>
      </div>

      {/* Section Wishlist */}
      <div className="wishlist-section">
        <div className="wishlist-title">
          <FaHeart className="wishlist-icon" />
          <h3>Wishlist</h3>
        </div>

        <div className="wishlist-games">
          {wishlistGames.map((game) => (
            <div key={game.id} className="game-item">
              <div className="game-info">
                <h4 className="game-title">{game.title}</h4>
                <div className="game-meta">
                  <span className="game-type">{game.type}</span>
                  <span className="game-views">{game.views}</span>
                </div>
              </div>
              <div className="game-action">
                <FaChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistHeader;