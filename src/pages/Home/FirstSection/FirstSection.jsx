import React from "react";
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
];

const FirstSection = () => {
  return (
    <section className="first-section">
      <div className="first-sectionr">
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
            catalogue se renouvelant pour faire le plaisir. Plongez dans l'univers du gaming sans vider
            votre porte-monnaie, les promos ont à portée de clic.
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
        
            <Button
              text="Voir catalogue"
              variant="transparent"
              size="medium"
              onClick={() => console.log("Catalogue clicked")}
            />
          </div>
        </div>

        <div className="image-grid-container">
          <div className="image-grid">
            <div className="gradient-overlay"></div>
            {images.map((img, index) => (
              <div key={index} className="image-container">
                <img src={img.image} alt={`Game ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default FirstSection;
