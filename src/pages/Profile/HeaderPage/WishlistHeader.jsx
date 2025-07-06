import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronRight from '../../assets/chevron-right.png';

const MAX_WISHLIST_DISPLAY = 5;

const WishlistHeader = ({ activeTab, setActiveTab }) => {
  const [wishlistGames, setWishlistGames] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, wishlistGames.length - MAX_WISHLIST_DISPLAY));

  // Afficher 5 jeux à partir de startIndex
  const visibleGames = wishlistGames.slice(startIndex, startIndex + MAX_WISHLIST_DISPLAY);
  const hasPagination = wishlistGames.length > MAX_WISHLIST_DISPLAY;

  return (
    <div className="wishlist-wrapper">
      <div className="menu">
        {/* ... menu ... */}
      </div>
      <div className="wishlist">
        <h3 className="wishlist-title"> <FavoriteBorderIcon className='icon'/> Wishlist</h3>
        {loading ? (
          <div className="noFavorite">Chargement...</div>
        ) : wishlistGames.length === 0 ? (
          <div className="noFavorite">Aucun jeu en favori</div>
        ) : (
          <>
            <div className={`wishlist-list-animated${hasPagination ? '' : ' wishlist-list-auto'}`} style={!hasPagination ? {maxHeight: 'none'} : {}}>
              {visibleGames.map((game, index) => (
                <div
                  key={game.wishlistId || game.gameId || index}
                  className={`game ${hoveredIndex === index ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="meta mb-1">
                    <span className="type">Game</span>
                    <span className="title">{game.gameTitle || 'Nom inconnu'}</span>
                    <span className="views">{game.gamePrice ? `${game.gamePrice} €` : 'Nan'}</span>
                  </div>
                  <img src={ChevronRight} alt="chevron right" className="chevron" />
                </div>
              ))}
            </div>
            {hasPagination && (
              <div className="wishlist-arrows">
                <button className="wishlist-arrow" onClick={handlePrev} disabled={startIndex === 0} aria-label="Précédent">
                  <ChevronLeftIcon />
                </button>
                <button className="wishlist-arrow" onClick={handleNext} disabled={startIndex + MAX_WISHLIST_DISPLAY >= wishlistGames.length} aria-label="Suivant">
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="logout-section">
        {/* ... logout ... */}
      </div>
    </div>
  );
};

export default WishlistHeader; 