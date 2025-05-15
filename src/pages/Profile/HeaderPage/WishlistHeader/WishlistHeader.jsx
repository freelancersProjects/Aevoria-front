import React from 'react';
import ChevronRight  from '../../../../assets/svg/chevron-right.svg';
import './WishlistHeader.scss';


const WishlistHeader = () => {
  const wishlistGames = [
    { title: "Cyberpunk 2077", type: "RPG", views: "1.5k" },
    { title: "Baldur's Gate 3", type: "RPG", views: "2.3k" },
    { title: "Elden Ring", type: "Action RPG", views: "3.1k" },
    { title: "The Witcher 3", type: "RPG", views: "4.0k" },
    { title: "Hades", type: "Rogue-like", views: "1.2k" },
  ];
  console.log(wishlistGames);
  return (
    <div className="wishlist-wrapper">
      <div className="menu">
        <div className="menu-item active">Profile</div>
        <div className="menu-item">Settings</div>
      </div>
      <div className="wishlist">
        <h3 className="wishlist-title"><span className="icon">🤍</span> Wishlist</h3>
        {wishlistGames.map((game, index) => (
          <div key={index} className="game">
            <div className="meta">
              <span className="type">Game</span>
              <span className="title">{game.title}</span>
              <span className="views">{game.views}</span>
            </div>
            <img src={ChevronRight} alt="chevron right" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistHeader;