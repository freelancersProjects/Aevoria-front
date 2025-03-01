import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SteamIcon from "../../../../public/assets/svg/steam.svg?react";
import EpicIcon from "../../../../public/assets/svg/epic-games.svg?react";
import PlaystationIcon from "../../../../public/assets/svg/playstation.svg?react";
import ArrowRightSlider from "../../../../public/assets/svg/chevron-right.svg?react";
import ArrowLeftSlider from "../../../../public/assets/svg/chevron-left.svg?react";
import DefaultImageSlider from "../../../../public/assets/images/photo-test.webp";
import Button from "../../../components/AEV/AEV.Button/Button";
import "./Slider.scss";

const Slider = ({ slides, autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(1); // Utilisation de slides étendues
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoPlayRef = useRef(null);

    // Création d'une liste étendue pour l'effet de boucle infinie
    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    useEffect(() => {
        if (!isTransitioning) {
            startAutoPlay();
        }
    }, [currentIndex]);

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            handleNextClick();
        }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const handlePrevClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNextClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);

        if (currentIndex === 0) {
            setCurrentIndex(slides.length);
        } else if (currentIndex === extendedSlides.length - 1) {
            setCurrentIndex(1);
        }
    };

    const handleIndicatorClick = (index) => {
        if (isTransitioning) return;
        setCurrentIndex(index + 1); // Ajustement pour l'effet de boucle
    };

    return (
        <>
            <div
                className="slider-container"
                onMouseEnter={stopAutoPlay}
                onMouseLeave={startAutoPlay}
            >
                <div
                    className="slider-wrapper"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? "transform 0.5s ease" : "none",
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedSlides.map((slide, index) => (
                        <div className="slider-slide" key={index}>
                            <div className="slider-image">
                                <img
                                    src={slide.image || DefaultImageSlider}
                                    alt={slide.title}
                                />
                            </div>

                            <div
                                className="slider-info"
                                style={{
                                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(14, 46, 105, 0.9)), url(${slide.image || DefaultImageSlider})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <p className="release">Dernière Sortie</p>
                                <h2 className="game-title">{slide.title}</h2>
                                <p className="genres">{slide.genres.join(" - ")}</p>
                                <div className="game-icons">
                                    {slide.isSteam && <SteamIcon className="icon" />}
                                    {slide.isEpic && <EpicIcon className="icon" />}
                                    {slide.isPlaystation && <PlaystationIcon className="icon" />}
                                </div>
                                <div className="game-pricing">
                                    <span className="current-price">{slide.price}€</span>
                                    {slide.discount > 0 && (
                                        <span className="old-price">{slide.oldPrice}€</span>
                                    )}
                                </div>
                                <Button
                                    text="Voir plus"
                                    variant="outline"
                                    size="medium"
                                    className="button-more-slider"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button className="prev-button" onClick={handlePrevClick}>
                    <ArrowLeftSlider />
                </button>
                <button className="next-button" onClick={handleNextClick}>
                    <ArrowRightSlider />
                </button>
            </div>

            <div className="slider-indicators">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === (currentIndex - 1) % slides.length ? "active" : ""}`}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))}
            </div>
        </>
    );
};

Slider.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string,
            title: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(PropTypes.string).isRequired,
            price: PropTypes.number.isRequired,
            oldPrice: PropTypes.number,
            discount: PropTypes.number,
            isSteam: PropTypes.bool,
            isEpic: PropTypes.bool,
            isPlaystation: PropTypes.bool,
        })
    ).isRequired,
    autoPlayInterval: PropTypes.number,
};

export default Slider;
