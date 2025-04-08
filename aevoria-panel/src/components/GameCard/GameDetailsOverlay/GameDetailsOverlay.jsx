import React from "react";
import "./GameDetailsOverlay.scss";
import { Close } from "@mui/icons-material";

const GameDetailsOverlay = ({ game, onClose }) => {
    return (
        <div className="game-details-overlay">
            <button className="close-btn" onClick={onClose}><Close /></button>

            <div className="header">
                <img src={game.cover} alt="cover" className="cover" />
                <div className="meta">
                    <h1>{game.name}</h1>
                    <p className="price">${game.price}</p>
                    <button className="cta">Ajouter au panier</button>
                </div>
            </div>

            <div className="info-section">
                <div><strong>Développeur :</strong> {game.developer}</div>
                <div><strong>Éditeur :</strong> {game.publisher}</div>
                <div><strong>Date de sortie :</strong> {game.releaseDate}</div>
                <div><strong>Plateforme :</strong> {game.platform}</div>
            </div>

            <div className="description">
                <h3>Description</h3>
                <p>{game.description}</p>
            </div>

            <div className="footer-section">
                <div className="rating">
                    <span>{game.rating}/5</span>
                    <p>Basé sur {game.reviews} avis</p>
                </div>
                <button className="write-review">Rédiger un test</button>
            </div>
        </div>
    );
};

export default GameDetailsOverlay;
