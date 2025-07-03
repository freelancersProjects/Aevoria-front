import React from 'react';
import './GameHeroSection.scss';
import DefaultImage from '../../../assets/images/photo-test.webp';
import { FaWindows, FaCheckCircle, FaDownload, FaTag } from 'react-icons/fa';
import CartIcon from '../../../assets/svg/cart.svg';
import HeartIcon from '../../../assets/svg/coeur.svg';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';
import { useAuthContext } from '../../../auth/AuthContext';

const GameHeroSection = () => {
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
        console.log('Added to cart');
        addNotification('Jeu ajouté au panier !', 'success');
    } else if (actionType === 'wishlist') {
        console.log('Added to wishlist');
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
              <img src={DefaultImage} alt="Game" className="gameview-image" />
            </div>
            {/* Infos principales */}
            <div className="gameview-info-block">
              <h2 className="gameview-title">Valorant</h2>
              <div className="gameview-pricing-row">
                <div className="discount-line">
                  <FaTag />
                  <span className="percentage-reduction">-18%</span>
                  <span className="old-price">$54</span>
                </div>
                <span className="new-price">$44.45</span>
              </div>
              <div className="gameview-platform-select">
                <select>
                  <option>XBox Series X/S</option>
                  <option>PC</option>
                  <option>PlayStation 5</option>
                </select>
              </div>
              <div className="gameview-badges">
                <span className="badge"><FaWindows /> Microsoft Store</span>
                <span className="badge"><FaCheckCircle /> En stock</span>
                <span className="badge"><FaDownload /> Téléchargement digital</span>
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
        {/* Infos secondaires (à droite, à faire plus tard si besoin) */}
      </section>
    </>
  );
};

export default GameHeroSection;
