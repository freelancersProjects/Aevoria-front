import React, { useState } from "react";
import GameDetailsOverlay from "./GameDetailsOverlay/GameDetailsOverlay";
import "./GameCard.scss";

const GameCard = ({ game }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <div className="game-card" onClick={() => setShowDetails(true)}>
                <img src={game.cover} alt={game.name} className="game-thumbnail" />
                <div className="game-info">
                    <h3>{game.name}</h3>
                    <span className={`status ${game.status.toLowerCase()}`}>{game.status}</span>
                </div>
            </div>

            {showDetails && (
                <GameDetailsOverlay game={game} onClose={() => setShowDetails(false)} />
            )}
        </>
    );
};

export default GameCard;
