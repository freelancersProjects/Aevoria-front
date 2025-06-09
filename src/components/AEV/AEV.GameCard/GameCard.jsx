import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from '../AEV.Skeleton/Skeleton';
import Toast from '../AEV.Toast/Toast';
import { useNavigate } from 'react-router-dom';
import SteamIcon from "../../../assets/svg/steam.svg?react";
import EpicIcon from "../../../assets/svg/epic-games.svg?react";
import PlaystationIcon from "../../../assets/svg/playstation.svg?react";
import { BsThreeDots } from "react-icons/bs";
import DefaultImage from "../../../assets/images/photo-test.webp";
import DrawerNotif from '../../../pages/Home/Drawer/DrawerNotif/DrawerNotif';
import apiService from '../../../services/apiService';
import useAuth from "../../../hooks/useAuth";
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import './GameCard.scss';

const GameCard = ({
    image,
    title,
    price,
    discount,
    percentage_reduction,
    isSteam,
    isEpic,
    isPlaystation,
    gameId,
    addByUser = false
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [showMenu, setShowMenu] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [shareSubject, setShareSubject] = useState('');
    const [shareMessage, setShareMessage] = useState('');
    const [cartId, setCartId] = useState(null);
    const [gameGenres, setGameGenres] = useState([]);

    const navigate = useNavigate();
    const { user } = useAuth();

    const discountedPrice = discount
        ? discount
        : percentage_reduction
            ? (price - (price * percentage_reduction) / 100).toFixed(2)
            : price;

    const gameImage = !image || image === "string" ? DefaultImage : image;

    const handleImageLoad = () => setIsImageLoaded(true);

    useEffect(() => {
        const fetchCart = async () => {
            if (!user?.userId) return;

            try {
                const cart = await apiService.get(`/cart/${user.userId}`);
                if (cart?.cartId) setCartId(cart.cartId);
            } catch (err) {
                console.log("Panier non trouvé");
            }
        };

        fetchCart();
    }, [user?.userId]);

    useEffect(() => {
        const fetchGameGenres = async () => {
            try {
                const response = await apiService.get(`/games/${gameId}/genres`);
                if (response?.$values) {
                    setGameGenres(response.$values);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des genres:", err);
            }
        };

        if (gameId) {
            fetchGameGenres();
        }
    }, [gameId]);

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if (!user?.userId) {
            setToast({ show: false, message: '', type: '' });
            setTimeout(() => {
                setToast({ show: true, message: "Veuillez vous connecter", type: "error" });
            }, 10);
            return;
        }

        try {
            const finalCartId = cartId;
            if (!finalCartId) {
                setToast({ show: false, message: '', type: '' });
                setTimeout(() => {
                    setToast({
                        show: true,
                        message: "Panier non trouvé, veuillez réessayer",
                        type: "error"
                    });
                }, 10);
                return;
            }

            const added = await apiService.postQuery(
                `/cart/items?cartId=${finalCartId}&gameId=${gameId}&quantity=1`
            );

            if (added) {
                setToast({ show: false, message: '', type: '' });

                setTimeout(() => {
                    setToast({
                        show: true,
                        message: "Jeu ajouté au panier",
                        type: "success"
                    });
                }, 10);
                setShowMenu(false);
            }
        } catch (err) {
            console.error(err);
            setToast({ show: false, message: '', type: '' });
            setTimeout(() => {
                setToast({
                    show: true,
                    message: "Erreur lors de l'ajout",
                    type: "error"
                });
            }, 10);
        }
    };

    const handleNavigate = () => {
        const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
        navigate(`/game/${safeTitle}/${gameId}`);
    };

    const handleShare = (gameTitle) => {
        const msg = `Salut ! J'aimerais te partager ce jeu : ${gameTitle}`;
        const subj = `Partage de jeu : ${gameTitle}`;
        setShareMessage(msg);
        setShareSubject(subj);
        setDrawerOpen(true);
        setShowMenu(false);
    };

    const displayedGenres = gameGenres.slice(0, 3);
    const remainingGenres = gameGenres.length > 3 ? gameGenres.slice(3) : [];

    return (
        <>
        <div className="game-card" onClick={handleNavigate}>
            {!isImageLoaded && (
                <div className="skeleton-wrapper">
                    <Skeleton height="200px" width="100%" />
                    <Skeleton height="20px" width="80%" style={{ marginTop: "10px" }} />
                    <Skeleton height="20px" width="60%" style={{ marginTop: "5px" }} />
                </div>
            )}

            <div className="image-wrapper">
                <img
                    src={gameImage}
                    alt={title}
                    className="game-image"
                    onLoad={handleImageLoad}
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                />

                {isImageLoaded && (
                    <div className="card-actions">
                        <button
                            className="menu-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                        >
                            <BsThreeDots className="menu-icon" />
                        </button>

                        {showMenu && (
                            <div className="action-menu" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleShare(title)}>Partager</button>
                                    <button onClick={handleAddToCart}>Ajouter au panier</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isImageLoaded && (
                <div className="game-info">
                    <h3 className="game-title">{title}</h3>
                        <div className="game-genres">
                            {displayedGenres.map((genre, index) => (
                                <span key={genre.genreId} className="genre-tag">
                                    {genre.name}{index < displayedGenres.length - 1 ? ' - ' : ''}
                                </span>
                            ))}
                            {remainingGenres.length > 0 && (
                                <Tooltip title={remainingGenres.map(g => g.name).join(' - ')}>
                                    <span className="genre-tag more-genres badge">
                                        +{remainingGenres.length}
                                    </span>
                                </Tooltip>
                            )}
                        </div>
                    <div className="game-icons">
                        {isSteam && <SteamIcon className="icon" />}
                        {isEpic && <EpicIcon className="icon" />}
                        {isPlaystation && <PlaystationIcon className="icon" />}
                    </div>
                    <div className="game-pricing">
                        <span className="current-price">{discountedPrice}€</span>
                        {(Number(discount) > 0 || Number(percentage_reduction) > 0) && (
                            <span className="old-price">{price}€</span>
                        )}
                    </div>
                </div>
            )}

                <DrawerNotif
                    isOpen={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    subject={shareSubject}
                    setSubject={setShareSubject}
                    message={shareMessage}
                    setMessage={setShareMessage}
                />
            </div>
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={5000}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </>
    );
};

GameCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    percentage_reduction: PropTypes.number,
    isSteam: PropTypes.bool,
    isEpic: PropTypes.bool,
    isPlaystation: PropTypes.bool,
    gameId: PropTypes.string.isRequired,
    addByUser: PropTypes.bool
};

export default GameCard;
