import React from "react";
import "./GameCard.scss";
import PropTypes from 'prop-types';
import SteamIcon from "../../../assets/svg/steam.svg?react";
import EpicIcon from "../../../assets/svg/epic-games.svg?react";
import PlaystationIcon from "../../../assets/svg/playstation.svg?react";
import DefaultImage from "../../../assets/images/photo-test.webp";

const GameCard = ({
    image,
    title,
    genres,
    price,
    discount,
    isSteam = false,
    isEpic = false,
    isPlaystation = false,
}) => {
    const discountedPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price;
    const gameImage = image || DefaultImage;

    return (
        <div className="game-card">
            <img src={gameImage} alt={title} className="game-image" />
            <div className="game-info">
                <h3 className="game-title">{title}</h3>
                <p className="game-genres">{genres.join(" - ")}</p>
                <div className="game-icons">
                    {isSteam && <SteamIcon className="icon" />}
                    {isEpic && <EpicIcon className="icon" />}
                    {isPlaystation && <PlaystationIcon className="icon" />}
                </div>
                <div className="game-pricing">
                    <span className="current-price">{discountedPrice}€</span>
                    {discount > 0 && <span className="old-price">{price}€</span>}
                </div>
            </div>
        </div>
    );
};
GameCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    isSteam: PropTypes.bool,
    isEpic: PropTypes.bool,
    isPlaystation: PropTypes.bool,
};

export default GameCard;
