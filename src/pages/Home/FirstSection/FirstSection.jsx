import React, { useEffect, useState } from "react";
import "./FirstSection.scss";
import Button from "../../../components/AEV/AEV.Button/Button";

const images = [
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
  { image: "/assets/images/photo-test.webp" },
];

const FirstSection = () => {
  return (
    <section className="first-section">
      <div className="blue-glow-effect"></div>
      
      <div className="section-container">
        <div className="content-area">
          <div className="badge">
            <span>Nouveau catalogue de jeux</span>
          </div>
          
          <h1 className="main-title">
            Jouez Sans <span className="blue">Limites</span>
            <br />
            Économisez Sans <span className="blue">Compter!</span>
          </h1>

          <p className="subtitle">
            Découvrez les meilleurs jeux à prix cassés, des offres exclusives chaque jour et un
            catalogue qui évolue en permanence pour votre plaisir. Plongez dans l'univers du gaming sans vous ruiner.
          </p>

          <div className="cta-buttons">
            <Button
              text="Voir catalogue"
              variant="transparent"
              size="medium"
              onClick={() => console.log("Catalogue clicked")}
            />
          </div>
        </div>
        
        <div className="images-gallery">
          <div className="image-grid">
            {images.map((item, index) => (
              <div key={index} className="image-item">
                <img src={item.image} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
