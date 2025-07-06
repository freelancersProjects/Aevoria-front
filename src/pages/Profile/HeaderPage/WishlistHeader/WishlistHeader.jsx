import React, { useState, useEffect } from 'react';
import ChevronRight  from '../../../../assets/svg/arrow-wishlist.svg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../../../hooks/useAuth';
import apiService from '../../../../services/apiService';
import './WishlistHeader.scss';

const MAX_WISHLIST_DISPLAY = 5;

const WishlistHeader = ({ activeTab, setActiveTab }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { logout, user } = useAuth();
  const [wishlistGames, setWishlistGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.userId) return;
      setLoading(true);
      try {
        const res = await apiService.get(`/wishlist/${user.userId}`);
        const wishlist = res?.$values || [];
        const gamesDetails = await Promise.all(
          wishlist.map(async (item) => {
            try {
              const game = await apiService.get(`/games/${item.gameId}`);
              return {
                ...item,
                gameTitle: game?.title || game?.name || '',
                gamePrice: game?.price || '',
              };
            } catch {
              return { ...item, gameTitle: '', gamePrice: '' };
            }
          })
        );
        setWishlistGames(gamesDetails);
      } catch (err) {
        setWishlistGames([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + MAX_WISHLIST_DISPLAY < wishlistGames.length ? prev + 1 : prev
    );
  };

  // Afficher 5 jeux à partir de startIndex
  const visibleGames = wishlistGames.slice(startIndex, startIndex + MAX_WISHLIST_DISPLAY);

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
        {loading ? (
          <div className="noFavorite">Chargement...</div>
        ) : wishlistGames.length === 0 ? (
          <div className="noFavorite">Aucun jeu en favori</div>
        ) : (
          <>
            <div className="wishlist-list-animated">
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
            <div className="wishlist-arrows">
              <button className="wishlist-arrow" onClick={handlePrev} disabled={startIndex === 0} aria-label="Précédent">
                <ChevronLeftIcon />
              </button>
              <button className="wishlist-arrow" onClick={handleNext} disabled={startIndex + MAX_WISHLIST_DISPLAY >= wishlistGames.length} aria-label="Suivant">
                <ChevronRightIcon />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          <LogoutIcon className="logout-icon" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistHeader;
