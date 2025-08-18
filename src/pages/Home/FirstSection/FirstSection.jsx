import React, { useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import Icon from "../../../components/AEV/AEV.Icon/Icon";
import Button from "../../../components/AEV/AEV.Button/Button";
import Toast from "../../../components/AEV/AEV.Toast/Toast";
import Skeleton from "../../../components/AEV/AEV.Skeleton/Skeleton";
import "./FirstSection.scss";

const FirstSection = () => {
  const { data: gamesData, isLoading, error } = useFetch("/games");

  const randomizedImages = useMemo(() => {
    const gamesArray = gamesData?.$values || gamesData || [];
    if (!Array.isArray(gamesArray) || gamesArray.length === 0) return [];
    // Filtrer les jeux qui ont un thumbnailUrl
    const withThumb = gamesArray.filter(g => g.thumbnailUrl);
    // Mélanger et prendre 20 jeux différents
    const shuffled = [...withThumb].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 20).map(game => game.thumbnailUrl);
  }, [gamesData]);

  if (isLoading) {
    return <Skeleton count={20} />;
  }
  if (error) {
    Toast.error("Erreur lors du chargement des jeux.");
    return null;
  }

  return (
    <section className="first-section">
      <div className="blue-glow-effect"></div>

      <div className="section-container">
        <div className="content-area">
          <div className="badge">
            <span className="badge-content">
              <Icon name="catalogue_game" size={18} style={{ marginRight: "8px" }} />
              Nouveau catalogue de jeux
            </span>
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
          <div className="image-grid">
            {randomizedImages.map((item, index) => (
              <div key={index} className="image-item">
                <img src={item} alt={`Image ${index}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
