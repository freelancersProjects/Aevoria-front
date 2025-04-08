import React, { useState } from "react";
import GameCard from "../../../components/GameCard/GameCard";
import "./Game.scss";

const mockGames = [
    {
        id: 1,
        name: "Elden Ring",
        status: "Active",
        cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        comments: 12,
        description: "Dark fantasy RPG in an open world.",
        price: 59.99,
        releaseDate: "February 25, 2022",
        publisher: "FromSoftware",
        developers: ["FromSoftware"],
        platforms: ["PC", "PS5", "Xbox"],
        recommendedConfig: `CPU: Ryzen 5 3600\nGPU: RTX 3060\nRAM: 16 GB\nStorage: 60 GB SSD`,
    },
    {
        id: 2,
        name: "Cyberpunk 2077",
        status: "Pending",
        cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        comments: 34,
        description: "Futuristic RPG in Night City.",
        price: 49.99,
        releaseDate: "December 10, 2020",
        publisher: "CD Projekt",
        developers: ["CD Projekt Red"],
        platforms: ["PC", "PS4", "PS5", "Xbox"],
        recommendedConfig: `CPU: Intel i7-4790\nGPU: GTX 1060\nRAM: 12 GB\nStorage: 70 GB SSD`,
    },
    {
        id: 3,
        name: "Stardew Valley",
        status: "Archived",
        cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
        comments: 8,
        description: "Relaxing farm-life simulation game.",
        price: 14.99,
        releaseDate: "February 26, 2016",
        publisher: "ConcernedApe",
        developers: ["ConcernedApe"],
        platforms: ["PC", "Switch", "PS4", "Xbox"],
        recommendedConfig: `CPU: 2 GHz\nGPU: 256 MB video memory\nRAM: 2 GB\nStorage: 500 MB`,
    },
];

const Game = () => {
    return (
        <div className="game-page">
            <h2 className="game-title">Mes Jeux</h2>
            <div className="game-grid">
                {mockGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default Game;
