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
  { image: "/assets/images/photo-test.webp" }
];

const FirstSection = () => {
  const [animatedImages, setAnimatedImages] = useState([...images, ...images]); // Pour la boucle infinie

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedImages((prevImages) => {
        const newImages = [...prevImages];
        const firstImage = newImages.shift(); // Supprime la première image
        newImages.push(firstImage); // Ajoute la première image à la fin
        return newImages;
      });
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="first-section">
      <div className="blue-glow-effect"></div>
      
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

      {/* GRILLE D'IMAGES */}
      <div className="image-grid-container">
        <div className="image-grid">
          {animatedImages.map((img, index) => (
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
