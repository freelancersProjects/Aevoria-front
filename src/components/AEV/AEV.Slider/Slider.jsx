import React, { useState } from "react";
import PropTypes from 'prop-types';
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
            <div 
                className="slider-container" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <img src={slide.image} alt={slide.title} className="slide-image" />
                        <div className="slide-info">
                            <div className="slide-tag">{slide.tag}</div>
                            <h2>{slide.title}</h2>
                            <div className="slide-genres">{slide.genres.join(" - ")}</div>
                            <div className="slide-price">
                                <span className="current-price">{slide.price}€</span>
                                {slide.originalPrice && (
                                    <span className="original-price">{slide.originalPrice}€</span>
                                )}
                            </div>
                            <Button 
                                text="Voir plus" 
                                variant="transparent" 
                                size="medium" 
                                onClick={slide.onButtonClick}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Button 
                text="←" 
                variant="transparent" 
                size="small" 
                onClick={prevSlide}
                className="slider-arrow prev"
            />
            <Button 
                text="→" 
                variant="transparent" 
                size="small" 
                onClick={nextSlide}
                className="slider-arrow next"
            />

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
            onButtonClick: PropTypes.func
        })
    ).isRequired
};

export default Slider; 