import React, { useMemo } from "react";
import GameCard from "../../../components/AEV/AEV.GameCard/GameCard";
import "./Promotions.scss";
import SectionTitle from "../../../components/AEV/AEV.SectionTitle/SectionTitle";

// Déplacer les données en dehors du composant
const promotionalGames = [
  {
    id: "game1", // Ajouter des IDs uniques
    title: "Kingdom come deliverance II",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: "/src/assets/images/photo-test.webp"
  },
  {
    id: "game2",
    title: "The Witcher 3",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: "/src/assets/images/photo-test.webp"
  },
  {
    id: "game3",
    title: "Minecraft",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: "/src/assets/images/photo-test.webp"
  }
].map(game => ({
  ...game,
  discount: ((game.oldPrice - game.price) / game.oldPrice * 100).toFixed(0)
}));

const Promotions = () => {
  // Utiliser useMemo pour éviter les re-calculs inutiles
  const memoizedGames = useMemo(() => promotionalGames, []);

  return (
    <div className="promotions-section">
      <SectionTitle text="Promotions" />
      <div className="game-cards-container">
        {memoizedGames.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            genres={game.genres}
            price={game.price}
            discount={game.discount}
            isSteam={game.isSteam}
            isEpic={game.isEpic}
            isPlaystation={game.isPlaystation}
            image={game.image}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Promotions);
