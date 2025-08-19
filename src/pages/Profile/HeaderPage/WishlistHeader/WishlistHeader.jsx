import { useState } from 'react';
import ChevronRight  from '../../../../assets/svg/arrow-wishlist.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './WishlistHeader.scss';

const WishlistHeader = ({ activeTab, setActiveTab }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const wishlistGames = [
    { title: 'Cyberpunk 2077', type: 'RPG', views: '1.5k' },
    { title: 'Baldur\'s Gate 3', type: 'RPG', views: '2.3k' },
    { title: 'Elden Ring', type: 'Action RPG', views: '3.1k' },
    { title: 'The Witcher 3', type: 'RPG', views: '4.0k' },
    { title: 'Hades', type: 'Rogue-like', views: '1.2k' },
  ];

  return (
    <div className="wishlist-wrapper">
      <div className="menu">
        <div
          className={`menu-item${activeTab === 'profile' ? ' active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </div>
        <div
          className={`menu-item${activeTab === 'settings' ? ' active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </div>
      </div>
      <div className="wishlist">
        <h3 className="wishlist-title"> <FavoriteBorderIcon className='icon'/> Wishlist</h3>
        {wishlistGames.map((game, index) => (
          <div
            key={index}
            className={`game ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="meta mb-1">
              <span className="type">Game</span>
              <span className="title">{game.title}</span>
              <span className="views">{game.views}</span>
            </div>
            <img src={ChevronRight} alt="chevron right" className="chevron" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistHeader;
