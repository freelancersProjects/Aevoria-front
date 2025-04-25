import React, { useState } from 'react';
import "./GameCard.scss";
import PropTypes from 'prop-types';
import Skeleton from '../AEV.Skeleton/Skeleton'; // Assure-toi que c'est bien importé ici
import Toast from '../AEV.Toast/Toast';
import SteamIcon from "../../../assets/svg/steam.svg?react";
import EpicIcon from "../../../assets/svg/epic-games.svg?react";
import PlaystationIcon from "../../../assets/svg/playstation.svg?react";
import DefaultImage from "../../../assets/images/photo-test.webp";

const GameCard = ({
    image,
    title,
    genres,
    price,
    percentage_reduction,
    isSteam,
    isEpic,
    isPlaystation
}) => {
    const discountedPrice = percentage_reduction
        ? (price - (price * percentage_reduction) / 100).toFixed(2)
        : price;

    const gameImage = !image || image === "string" ? DefaultImage : image;
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    if (toast.show) {
        return (
            <Toast
                message={toast.message}
                type={toast.type}
                duration={5000}
                onClose={() => setToast({ ...toast, show: false })}
            />
        );
    }

    return (
        <div className="game-card">
            {!isImageLoaded && (
                <div className="skeleton-wrapper">
                    <Skeleton height="200px" width="100%" />
                    <Skeleton height="20px" width="80%" style={{ marginTop: "10px" }} />
                    <Skeleton height="20px" width="60%" style={{ marginTop: "5px" }} />
                </div>
            )}

            <img
                src={gameImage}
                alt={title}
                className="game-image"
                onLoad={handleImageLoad}
                style={{ display: isImageLoaded ? 'block' : 'none' }}
            />

            {isImageLoaded && (
                <div className="game-info">
                    <h3 className="game-title">{title}</h3>
                    <p className="game-genres">{Array.isArray(genres) ? genres.join(" - ") : ''}</p>
                    <div className="game-icons">
                        {isSteam && <SteamIcon className="icon" />}
                        {isEpic && <EpicIcon className="icon" />}
                        {isPlaystation && <PlaystationIcon className="icon" />}
                    </div>
                    <div className="game-pricing">
                        <span className="current-price">{discountedPrice}€</span>
                        {Number(percentage_reduction) > 0 && (
                            <span className="old-price">{price}€</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

GameCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    percentage_reduction: PropTypes.number,
    isSteam: PropTypes.bool,
    isEpic: PropTypes.bool,
    isPlaystation: PropTypes.bool,
};

export default GameCard;
