import React, { useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import ControllerIcon from "../../../../public/assets/svg/catalogue_game.svg?react";
import Button from "../../../components/AEV/AEV.Button/Button";
import Loader from "../../../components/AEV/AEV.Loader/Loader";
import "./FirstSection.scss";

const FirstSection = () => {
  const { data: mediaData, loading, error } = useFetch("/games/media/game-images");

  const randomizedImages = useMemo(() => {
    const imageArray = mediaData?.$values || mediaData || [];
    if (!Array.isArray(imageArray) || imageArray.length === 0) return [];

    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    const result = [];
    while (result.length < 20) {
      result.push(...shuffled);
    }

    return result.slice(0, 20);
  }, [mediaData]);

  return (
    <section className="first-section">
      <div className="blue-glow-effect"></div>

      <div className="section-container">
        <div className="content-area">
          <div className="badge">
            <span className="badge-content"><ControllerIcon />Nouveau catalogue de jeux</span>
          </div>

          <h1 className="main-title">
            Jouez Sans <span className="blue">Limites</span><br />
            Économisez Sans <span className="blue">Compter!</span>
          </h1>

          <p className="subtitle">
            Découvrez les meilleurs jeux à prix cassés, des offres exclusives chaque jour et un
            catalogue qui évolue en permanence pour votre plaisir.
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
          {loading ? (
            <div className="image-loader-wrapper">
              <Loader variant="logo" size="large" />
            </div>
          ) : (
            <div className="image-grid">
              {randomizedImages.map((item, index) => (
                <div key={index} className="image-item">
                  <img src={item} alt={`Image ${index}`} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
