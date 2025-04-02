import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './SliderSelector.scss';

const SliderSelector = ({
    slides = [],
    autoPlay = false,
    interval = 3000,
    loop = true,
    showMultiple = 1,
    cropOverflow = false,
    clickable = false,
    onSlideClick = () => { },
}) => {
    const containerRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            handleNext();
        }, interval);
        return () => clearInterval(timer);
    }, [currentIndex, autoPlay, interval]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (loop) {
            setCurrentIndex(slides.length - showMultiple);
        }
    };

    const handleNext = () => {
        if (currentIndex < slides.length - showMultiple) {
            setCurrentIndex(currentIndex + 1);
        } else if (loop) {
            setCurrentIndex(0);
        }
    };

    const slideStyle = {
        transform: `translateX(-${(100 / showMultiple) * currentIndex}%)`,
        gridTemplateColumns: `repeat(${slides.length}, ${100 / showMultiple}%)`,
    };

    return (
        <div className={`aev-slider-wrapper ${cropOverflow ? 'cropped' : ''}`}>
            <div className="aev-slider-container" ref={containerRef}>
                <div className="slider-track" style={slideStyle}>
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className="slide"
                            onClick={() => clickable && onSlideClick(slide)}
                        >
                            <img src={slide.image} alt={`slide-${idx}`} />
                            {/* No title by default – optional if needed */}
                        </div>
                    ))}
                </div>

                <button className="nav-arrow left" onClick={handlePrev}>‹</button>
                <button className="nav-arrow right" onClick={handleNext}>›</button>
            </div>
        </div>
    );
};

SliderSelector.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string,
        })
    ).isRequired,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    loop: PropTypes.bool,
    showMultiple: PropTypes.number,
    cropOverflow: PropTypes.bool,
    clickable: PropTypes.bool,
    onSlideClick: PropTypes.func,
};

export default SliderSelector;
