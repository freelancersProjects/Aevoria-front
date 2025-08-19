import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './SliderSelector.scss';

const SliderSelector = ({
  slides = [],
  autoPlay = false,
  interval = 3000,
  loop = true,
  showMultiple = 4,
  cropOverflow = false,
  clickable = false,
  onSlideClick = () => { },
  selectedSlide = null,
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

  const handleSlideClick = (slide) => {
    if (clickable) {
      onSlideClick(slide);
    }
  };

  const isActive = (slide) => {
    return selectedSlide && selectedSlide.image === slide.image;
  };

  return (
    <div className={`aev-slider-wrapper ${cropOverflow ? 'cropped' : ''}`}>
      <div className="aev-slider-container" ref={containerRef}>
        {/* Navigation arrows */}
        <button
          className="nav-arrow left"
          onClick={handlePrev}
          disabled={currentIndex === 0 && !loop}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className="nav-arrow right"
          onClick={handleNext}
          disabled={currentIndex >= slides.length - showMultiple && !loop}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Thumbnails container */}
        <div className="thumbnail-container">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`thumbnail ${isActive(slide) ? 'active' : ''}`}
              onClick={() => handleSlideClick(slide)}
            >
              <img
                src={slide.thumbnail || slide.image}
                alt={slide.title || `slide-${idx}`}
              />
              {slide.title && (
                <div className="thumbnail-overlay">
                  <div className="thumbnail-title">{slide.title}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SliderSelector.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  loop: PropTypes.bool,
  showMultiple: PropTypes.number,
  cropOverflow: PropTypes.bool,
  clickable: PropTypes.bool,
  onSlideClick: PropTypes.func,
  selectedSlide: PropTypes.object,
};

export default SliderSelector;
