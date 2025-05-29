import React from 'react';
import './GameHeroSection.scss';
import DefaultImage from '../../../assets/images/photo-test.webp';
import { FaHeart, FaWindows, FaCheckCircle, FaDownload, FaTag, FaShoppingCart } from 'react-icons/fa';

const GameHeroSection = () => {
  return (
    <section className="gameview-container">
      <div className="gameview-background-top" />
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
              <button className="like-btn" title="Ajouter aux favoris">
                <FaHeart />
              </button>
              <button className="add-to-cart-btn">
                <FaShoppingCart /> Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Infos secondaires (à droite, à faire plus tard si besoin) */}
    </section>
  );
};

export default GameHeroSection;
