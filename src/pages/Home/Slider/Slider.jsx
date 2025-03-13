import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
    const [currentIndex, setCurrentIndex] = useState(1); // Commencer à 1 pour éviter l'effet de saut
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);
    const sliderRef = useRef(null);
    const isMountedRef = useRef(true);
    const isVisibleRef = useRef(true);

    // Étendre la liste des slides pour le bouclage infini
    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    useLayoutEffect(() => {
        return () => {
            isMountedRef.current = false;
            isVisibleRef.current = false;
            clearAllIntervals();

            if (sliderRef.current) {
                sliderRef.current.style.transition = "none";
            }
        };
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        isVisibleRef.current = true;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                isVisibleRef.current = false;
                stopAutoPlay();
            } else {
                isVisibleRef.current = true;
                if (!isTransitioning && isMountedRef.current) {
                    startAutoPlay();
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        startAutoPlay();

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            isMountedRef.current = false;
            isVisibleRef.current = false;
            clearAllIntervals();
        };
    }, []);

    useEffect(() => {
        if (!isTransitioning && isMountedRef.current && isVisibleRef.current) {
            startAutoPlay();
        }
    }, [currentIndex, isTransitioning]);

    const clearAllIntervals = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const startAutoPlay = () => {
        stopAutoPlay();

        if (!isMountedRef.current || !isVisibleRef.current) return;

        intervalRef.current = setInterval(() => {
            if (isMountedRef.current && isVisibleRef.current && !isTransitioning) {
                handleNextClick();
            }
        }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handlePrevClick = () => {
        if (isTransitioning || !isMountedRef.current) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNextClick = () => {
        if (isTransitioning || !isMountedRef.current) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
        if (!isMountedRef.current) return;

        setIsTransitioning(false);

        // Si on atteint le faux dernier slide, on revient immédiatement au vrai premier
        if (currentIndex === extendedSlides.length - 1) {
            setTimeout(() => {
                if (sliderRef.current && isMountedRef.current) {
                    sliderRef.current.style.transition = "none";
                    setCurrentIndex(1);
                    requestAnimationFrame(() => {
                        if (sliderRef.current && isMountedRef.current) {
                            sliderRef.current.style.transition = "transform 0.5s ease-in-out";
                        }
                    });
                }
            }, 0);
        }

        // Si on atteint le faux premier slide (en allant vers la gauche), on revient immédiatement au vrai dernier
        else if (currentIndex === 0) {
            setTimeout(() => {
                if (sliderRef.current && isMountedRef.current) {
                    sliderRef.current.style.transition = "none";
                    setCurrentIndex(slides.length);
                    requestAnimationFrame(() => {
                        if (sliderRef.current && isMountedRef.current) {
                            sliderRef.current.style.transition = "transform 0.5s ease-in-out";
                        }
                    });
                }
            }, 0);
        }
    };

    const handleIndicatorClick = (index) => {
        if (isTransitioning || !isMountedRef.current) return;
        setCurrentIndex(index + 1);
    };

    return (
        <>
            <div
                className="slider-container"
                onMouseEnter={stopAutoPlay}
                onMouseLeave={() => {
                    if (isMountedRef.current && isVisibleRef.current) {
                        startAutoPlay();
                    }
                }}
            >
                <div
                    ref={sliderRef}
                    className="slider-wrapper"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedSlides.map((slide, index) => (
                        <div className="slider-slide" key={index}>
                            <div className="slider-image">
                                <img src={slide.image || DefaultImageSlider} alt={slide.title} />
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
    slides: PropTypes.array.isRequired,
    autoPlayInterval: PropTypes.number,
};

export default Slider;
