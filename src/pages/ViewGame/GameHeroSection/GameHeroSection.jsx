import React from 'react';
import './GameHeroSection.scss';
import { FaWindows, FaCheckCircle, FaDownload, FaTag } from 'react-icons/fa';
import CartIcon from '../../../assets/svg/cart.svg';
import HeartIcon from '../../../assets/svg/coeur.svg';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';
import { useAuthContext } from '../../../auth/AuthContext';

const GameHeroSection = ({
  image,
  title,
  discount,
  oldPrice,
  price,
  platforms = [],
  badges = [],
  inStock = true,
  onAddToCart,
  onAddToWishlist
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleAction = (actionType) => {
    if (!user) {
      addNotification('Veuillez vous connecter pour continuer', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    if(actionType === 'cart') {
      if (onAddToCart) onAddToCart();
      addNotification('Jeu ajouté au panier !', 'success');
    } else if (actionType === 'wishlist') {
      if (onAddToWishlist) onAddToWishlist();
      addNotification('Jeu ajouté à la wishlist !', 'success');
    }
  };

  return (
    <>
      <div className="gameview-background-top" />
      <section className="gameview-container">
        <div className="gameview-card">
          <div className="gameview-content">
            {/* Image du jeu */}
            <div className="gameview-image-block">
              <img src={image || require('../../../assets/images/photo-test.webp')} alt={title || 'Game'} className="gameview-image" />
            </div>
            {/* Infos principales */}
            <div className="gameview-info-block">
              <h2 className="gameview-title">{title || 'Nom du jeu inconnu'}</h2>
              <div className="gameview-pricing-row">
                <div className="discount-line">
                  <FaTag />
                  <span className="percentage-reduction">{discount ? `-${discount}%` : '-0%'}</span>
                  <span className="old-price">{oldPrice ? `${oldPrice}€` : ''}</span>
                </div>
                <span className="new-price">{price ? `${price}€` : 'Prix inconnu'}</span>
              </div>
              <div className="gameview-platform-select">
                <select>
                  {platforms.length > 0 ? platforms.map((p, i) => (
                    <option key={i}>{p}</option>
                  )) : <option>Plateforme inconnue</option>}
                </select>
              </div>
              <div className="gameview-badges">
                {badges.length > 0 ? badges.map((badge, i) => (
                  <span className="badge" key={i}>{badge.icon} {badge.text}</span>
                )) : (
                  <>
                    <span className="badge"><FaWindows /> Microsoft Store</span>
                    <span className="badge"><FaCheckCircle /> {inStock ? 'En stock' : 'Rupture'}</span>
                    <span className="badge"><FaDownload /> Téléchargement digital</span>
                  </>
                )}
              </div>
              <div className="gameview-actions-row">
                <button className="like-btn" title="Ajouter aux favoris" onClick={() => handleAction('wishlist')}>
                  <img src={HeartIcon} alt="Heart" />
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAction('cart')}>
                  <img src={CartIcon} alt="Cart" /> Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameHeroSection;
