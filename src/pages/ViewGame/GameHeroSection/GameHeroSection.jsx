import React from 'react';
import './GameHeroSection.scss';
import DefaultImage from '../../../assets/images/photo-test.webp';
import { FaHeart } from 'react-icons/fa';

const GameHeroSection = () => {
  return (
    <div className="gameview-container">
      <div className="gameview-content">
        <img src={DefaultImage} alt="Game" className="gameview-image" />
        <div className="gameview-info">
          <h2 className="gameview-title">Valorant</h2>
          <div className="gameview-pricing">
            <span className="percentage-reduction">-18%</span>
            <span className="old-price">$54</span>
            <span className="new-price">$44.45</span>
          </div>
          <input
            type="text"
            placeholder="MouseSeries X9"
            className="gameview-input"
          />
          <div className="gameview-details">
            <span>Microsoft Store</span>
            <span className="in-stock">✔ En stock</span>
            <span>Téléchargement digital</span>
          </div>
          <div className="gameview-actions">
            <button className="like-btn">
              <FaHeart color="#0D6EFD" />
            </button>
            <button className="add-to-cart-btn">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeroSection;
