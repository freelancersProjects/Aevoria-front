import React, { useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import Icon from "../../../components/AEV/AEV.Icon/Icon";
import Button from "../../../components/AEV/AEV.Button/Button";
import Toast from "../../../components/AEV/AEV.Toast/Toast";
import Skeleton from "../../../components/AEV/AEV.Skeleton/Skeleton";
import "./FirstSection.scss";

const IMAGES_COUNT = 20;

const FirstSection = () => {
  const { data: gamesData, isLoading, error } = useFetch("/games");

  const randomizedImages = useMemo(() => {
    const gamesArray = gamesData?.$values || gamesData || [];
    if (!Array.isArray(gamesArray) || gamesArray.length === 0) return [];
    if (error) {
      Toast.error("Erreur lors du chargement des images de jeux.");
      return [];
    }
    const images = gamesArray.map(g => g.thumbnailUrl).filter(Boolean);
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, IMAGES_COUNT);
  }, [gamesData, error]);

  if (isLoading) {
    return <Skeleton count={IMAGES_COUNT} />;
  }

  if (!gamesData || (Array.isArray(gamesData) && gamesData.length === 0) || (gamesData?.$values && gamesData.$values.length === 0)) {
    return <div style={{color: 'white', background: '#222', padding: 16, borderRadius: 8}}>
      <b>Aucun jeu trouvé !</b>
      <pre>{JSON.stringify(gamesData, null, 2)}</pre>
    </div>;
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
            {randomizedImages.map((url, index) => (
              <div key={index} className="image-item image-shadow">
                <img src={url} alt={`Image ${index}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
