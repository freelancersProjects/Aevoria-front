import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import SteamIcon from "../../../assets/svg/steam.svg?react";
import EpicIcon from "../../../assets/svg/epic-games.svg?react";
import PlaystationIcon from "../../../assets/svg/playstation.svg?react";
import ArrowRightSlider from "../../../assets/svg/chevron-right.svg?react";
import ArrowLeftSlider from "../../../assets/svg/chevron-left.svg?react";
import DefaultImageSlider from "../../../assets/images/photo-test.webp";
import Button from "../../../components/AEV/AEV.Button/Button";
import apiService from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import "./Slider.scss";

const Slider = ({ autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [recentGames, setRecentGames] = useState([]);
    const intervalRef = useRef(null);
    const sliderRef = useRef(null);
    const isMountedRef = useRef(true);
    const isVisibleRef = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentGames = async () => {
            try {
                const response = await apiService.get('/games');
                if (response?.$values) {
                    // Trier les jeux par date de création (du plus récent au plus ancien)
                    const sortedGames = response.$values.sort((a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    // Prendre les 3 premiers jeux
                    setRecentGames(sortedGames.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching recent games:', error);
            }
        };

        fetchRecentGames();
    }, []);

    // Étendre la liste des slides pour le bouclage infini
    const extendedSlides = recentGames.length > 0
        ? [recentGames[recentGames.length - 1], ...recentGames, recentGames[0]]
        : [];

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
            if (sliderRef.current && isMountedRef.current) {
                sliderRef.current.style.transition = "none";
            }
            setCurrentIndex(() => 1);
            setTimeout(() => {
                if (sliderRef.current && isMountedRef.current) {
                    sliderRef.current.style.transition = "transform 0.5s ease-in-out";
                }
            }, 20);
        }

        // Si on atteint le faux premier slide (en allant vers la gauche), on revient immédiatement au vrai dernier
        else if (currentIndex === 0) {
            if (sliderRef.current && isMountedRef.current) {
                sliderRef.current.style.transition = "none";
            }
            setCurrentIndex(() => recentGames.length);
            setTimeout(() => {
                if (sliderRef.current && isMountedRef.current) {
                    sliderRef.current.style.transition = "transform 0.5s ease-in-out";
                }
            }, 20);
        }
    };

    const handleIndicatorClick = (index) => {
        if (isTransitioning || !isMountedRef.current) return;
        setCurrentIndex(index + 1);
    };

    const handleViewMore = (gameId) => {
        const game = recentGames.find(g => g.gameId === gameId);
        const safeTitle = game.title.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
        if (game) {
            navigate(`/game/${safeTitle}/${gameId}`);
        }
    };

    return (
        <>
            {recentGames.length > 0 && (
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
                        {extendedSlides.map((game, index) => (
                            <div className="slider-slide" key={index}>
                                <div className="slider-image">
                                    <img src={game.thumbnailUrl || DefaultImageSlider} alt={game.title} />
                                </div>

                                <div
                                    className="slider-info"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(14, 46, 105, 0.9)), url(${game.thumbnailUrl || DefaultImageSlider})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <p className="release">Dernière Sortie</p>
                                    <h2 className="game-title">{game.title}</h2>
                                    <p className="genres">{game.genres?.join(" - ") || "Aucun genre"}</p>
                                    <div className="game-icons">
                                        {game.isAvailableOnSteam && <SteamIcon className="icon" />}
                                        {game.isAvailableOnEpic && <EpicIcon className="icon" />}
                                        {game.isAvailableOnPlayStation && <PlaystationIcon className="icon" />}
                                    </div>
                                    <div className="game-pricing">
                                        <span className="current-price">
                                            {game.percentageReduction > 0
                                                ? (game.price - (game.price * game.percentageReduction / 100)).toFixed(2)
                                                : game.discount
                                                    ? game.discount.toFixed(2)
                                                    : game.price.toFixed(2)}€
                                        </span>
                                        {(game.percentageReduction > 0 || game.discount) && (
                                            <span className="old-price">{game.price.toFixed(2)}€</span>
                                        )}
                                    </div>
                                    <Button
                                        text="Voir plus"
                                        variant="outline"
                                        size="medium"
                                        className="button-more-slider"
                                        onClick={() => handleViewMore(game.gameId)}
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
            )}

            <div className="slider-indicators">
                {recentGames.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === (currentIndex - 1) % recentGames.length ? "active" : ""}`}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))}
            </div>
        </>
    );
};

Slider.propTypes = {
    autoPlayInterval: PropTypes.number,
};

export default Slider;
