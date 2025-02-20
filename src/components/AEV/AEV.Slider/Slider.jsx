import React, { useState } from "react";
import PropTypes from 'prop-types';
import SteamIcon from "../../../../public/assets/svg/steam.svg?react";
import EpicIcon from "../../../../public/assets/svg/epic-games.svg?react";
import PlaystationIcon from "../../../../public/assets/svg/playstation.svg?react";
import DefaultImage from "../../../../public/assets/images/photo-test.webp";
import "./Slider.scss";
import Button from "../AEV.Button/Button";

const Slider = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="aev-slider">
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                    {/* Image Part*/}
                    <div className="slide-image-container">
                        <img
                            src={slide.image || DefaultImage}
                            alt={slide.title}
                            className="slide-image"
                        />
                    </div>

                    {/* Information Parts */}
                    <div className="slide-info">
                        <div className="slide-info-content">
                            <span className="slide-tag">{slide.tag}</span>
                            <h2>{slide.title}</h2>
                            <div className="slide-genres">{slide.genres.join(" - ")}</div>

                            <div className="slide-price">
                                <span className="current-price">{slide.price}€</span>
                                {slide.originalPrice && (
                                    <span className="original-price">{slide.originalPrice}€</span>
                                )}
                            </div>

                            <div className="slide-platforms">
                                {slide.isSteam && <SteamIcon className="platform-icon" />}
                                {slide.isEpic && <EpicIcon className="platform-icon" />}
                                {slide.isPlaystation && <PlaystationIcon className="platform-icon" />}
                            </div>

                            <Button text="Voir plus" variant="transparent" size="medium" />
                        </div>
                    </div>
                </div>
            ))}

            {/* Button of navigation */}
            <button className="slider__btn-prev" onClick={prevSlide}>
                <img src="/assets/svg/chevron-left.svg" alt="Précédent" />
            </button>
            <button className="slider__btn-next" onClick={nextSlide}>
                <img src="/assets/svg/chevron-right.svg" alt="Suivant" />
            </button>

            {/* dots */}
            <div className="slider-dots">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

Slider.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(PropTypes.string).isRequired,
            price: PropTypes.number.isRequired,
            originalPrice: PropTypes.number,
            tag: PropTypes.string,
            isSteam: PropTypes.bool,
            isEpic: PropTypes.bool,
            isPlaystation: PropTypes.bool
        })
    ).isRequired
};

export default Slider;
