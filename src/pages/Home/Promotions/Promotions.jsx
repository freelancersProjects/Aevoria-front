import React, { useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import GameCard from "../../../components/AEV/AEV.GameCard/GameCard";
import Skeleton from "../../../components/AEV/AEV.Skeleton/Skeleton";
import "./Promotions.scss";

const Promotions = () => {
  const { data: gamesData, isLoading } = useFetch("/games");

  // Top 3 promotions par discount décroissant
  const topPromos = useMemo(() => {
    const arr = gamesData?.$values || gamesData || [];
    return arr
      .filter(g => g.discount > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, 3);
  }, [gamesData]);

  return (
    <div className="promotions-section">
      <div className="game-cards-container">
        {isLoading ? (
          <Skeleton count={3} />
        ) : (
          topPromos.map((game) => (
            <GameCard
              key={game.gameId}
              image={game.thumbnailUrl}
              title={game.title}
              price={game.price}
              discount={game.discount}
              percentage_reduction={game.percentageReduction}
              isSteam={game.isAvailableOnSteam}
              isEpic={game.isAvailableOnEpic}
              isPlaystation={game.isAvailableOnPlayStation}
              gameId={game.gameId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Promotions;
