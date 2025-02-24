import React from "react";
import GameCard from "../../../components/AEV/AEV.GameCard/GameCard";
import "./Promotions.scss";

const promotionalGames = [
  {
    title: "Kingdom come deliverance II",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: "/assets/images/photo-test.webp"
  },
  {
    title: "The Witcher 3",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: "/assets/images/photo-test.webp"
  },
  {
    title: "Minecraft",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: "/assets/images/photo-test.webp"
  }
];

const Promotions = () => {
  return (
    <div className="promotions-section">
      <div className="game-cards-container">
        {promotionalGames.map((game, index) => (
          <GameCard 
            key={index}
            title={game.title}
            genres={game.genres}
            price={game.price}
            discount={((game.oldPrice - game.price) / game.oldPrice * 100).toFixed(0)}
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

export default Promotions; 