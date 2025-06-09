import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Skeleton from '../../components/AEV/AEV.Skeleton/Skeleton';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import GameFilters from '../../components/GameFilters/GameFilters';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import './CategorieView.scss';
import apiService from '../../services/apiService';

function CategorieView() {
    const { genreId } = useParams();
    const { data: genre } = useFetch(`/genres/${genreId}`);
    const { data: games, isLoading, error } = useFetch(`/games/bygenre/${genreId}`);
    const [gameGenres, setGameGenres] = useState([]);

    const [selectedSort, setSelectedSort] = useState("Les plus pertinents");
    const [selectedPlatform, setSelectedPlatform] = useState("Toutes les plateformes");
    const [selectedGenre, setSelectedGenre] = useState("Tous les genres");
    const [selectedAvailability, setSelectedAvailability] = useState("Tout");
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [inStock, setInStock] = useState(false);
    const [filteredGames, setFilteredGames] = useState([]);
    const [activeFilters, setActiveFilters] = useState(0);

    useEffect(() => {
        const fetchGameGenres = async () => {
            if (!genreId) return;
            try {
                const response = await apiService.get(`/games/${genreId}/genres`);
                if (response?.$values) {
                    setGameGenres(response.$values);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des genres:", err);
            }
        };

        fetchGameGenres();
    }, [genreId]);

    useEffect(() => {
        let count = 0;
        if (selectedSort !== "Les plus pertinents") count++;
        if (selectedPlatform !== "Toutes les plateformes") count++;
        if (selectedGenre !== "Tous les genres") count++;
        if (selectedAvailability !== "Tout") count++;
        if (priceRange[0] > 0 || priceRange[1] < 200) count++;
        if (inStock) count++;
        setActiveFilters(count);
    }, [selectedSort, selectedPlatform, selectedGenre, selectedAvailability, priceRange, inStock]);

    useEffect(() => {
        if (games?.$values) {
            let filtered = [...games.$values];

            if (selectedPlatform !== "Toutes les plateformes") {
                filtered = filtered.filter(game => {
                    switch (selectedPlatform) {
                        case 'PC': return game.isAvailableOnPC;
                        case 'PlayStation': return game.isAvailableOnPlayStation;
                        case 'Xbox': return game.isAvailableOnXbox;
                        case 'Nintendo': return game.isAvailableOnNintendo;
                        default: return true;
                    }
                });
            }

            if (selectedAvailability !== "Tout") {
                filtered = filtered.filter(game => {
                    switch (selectedAvailability) {
                        case 'En stock': return game.isInStock;
                        case 'Précommande': return game.isPreorder;
                        case 'Prochainement': return game.isComingSoon;
                        default: return true;
                    }
                });
            }

            filtered = filtered.filter(game => {
                const finalPrice = game.price - (game.price * (game.percentageReduction || 0) / 100);
                return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
            });

            if (inStock) {
                filtered = filtered.filter(game => game.isInStock);
            }

            filtered.sort((a, b) => {
                const priceA = a.price - (a.price * (a.percentageReduction || 0) / 100);
                const priceB = b.price - (b.price * (b.percentageReduction || 0) / 100);

                switch (selectedSort) {
                    case "Prix croissant":
                        return priceA - priceB;
                    case "Prix décroissant":
                        return priceB - priceA;
                    case "Date de sortie":
                        return new Date(b.releaseDate) - new Date(a.releaseDate);
                    case "Alphabétique":
                        return a.title.localeCompare(b.title);
                    case "Meilleures notes":
                        return (b.rating || 0) - (a.rating || 0);
                    case "Plus populaires":
                        return (b.popularity || 0) - (a.popularity || 0);
                    default:
                        return 0;
                }
            });

            setFilteredGames(filtered);
        }
    }, [games, selectedPlatform, selectedSort, selectedAvailability, priceRange, inStock]);

    const renderSkeletons = () =>
        Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="game-card-skeleton">
                <Skeleton height="267px" width="100%" />
                <div className="game-info-skeleton">
                    <Skeleton height="24px" width="80%" />
                    <Skeleton height="20px" width="60%" />
                    <Skeleton height="32px" width="40%" />
                </div>
            </div>
        ));

    const renderGames = () => {
        return filteredGames.map((game) => (
            <GameCard
                key={game.gameId}
                image={game.thumbnailUrl}
                title={game.title}
                price={game.price}
                discount={game.discount}
                percentage_reduction={game.percentageReduction}
                isSteam={game.isAvailableOnSteam}
                isEpic={game.isAvailableOnEpic}
                isPlaystation={game.isAvailableOnPlayStation}
                gameId={game.gameId}
            />
        ));
    };

    const resetFilters = () => {
        setSelectedSort("Les plus pertinents");
        setSelectedPlatform("Toutes les plateformes");
        setSelectedGenre("Tous les genres");
        setSelectedAvailability("Tout");
        setPriceRange([0, 200]);
        setInStock(false);
    };

    if (isLoading) {
        return <div className="categorie-view loading">Chargement des jeux...</div>;
    }

    if (error) {
        return <div className="categorie-view error">Erreur de chargement des jeux</div>;
    }

    const displayedGenres = gameGenres.slice(0, 3);
    const remainingGenres = gameGenres.length > 3 ? gameGenres.slice(3) : [];

    return (
        <div className="categorie-view">
            <div className="categorie-header">
                {genre?.imageUrl && <img src={genre.imageUrl} alt={genre.name} />}
                <div className="header-content">
                    <h1>{genre?.name || 'Catégorie'}</h1>
                    <div className="genre-chips">
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                            {displayedGenres.map((genre) => (
                                <Chip
                                    key={genre.genreId}
                                    label={genre.name}
                                    size="small"
                                    className="genre-chip"
                                />
                            ))}
                            {remainingGenres.length > 0 && (
                                <Tooltip
                                    title={
                                        <Stack spacing={0.5}>
                                            {remainingGenres.map((genre) => (
                                                <span key={genre.genreId}>{genre.name}</span>
                                            ))}
                                        </Stack>
                                    }
                                >
                                    <Chip
                                        label={`+${remainingGenres.length}`}
                                        size="small"
                                        className="genre-chip more-genres"
                                    />
                                </Tooltip>
                            )}
                        </Stack>
                    </div>
                    <p>{genre?.description}</p>
                </div>
            </div>

            <div className="search-container">
                <div className="search-header">
                    <div className="search-info">
                        <h1>
                            <span className="results-count">
                                {filteredGames.length} jeu{filteredGames.length > 1 ? 'x' : ''}
                            </span>
                        </h1>
                    </div>

                    <GameFilters
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        selectedAvailability={selectedAvailability}
                        setSelectedAvailability={setSelectedAvailability}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        inStock={inStock}
                        setInStock={setInStock}
                        showAllFilters={true}
                    />
                </div>

                <div className="games-container">
                    {isLoading ? renderSkeletons() : (
                        filteredGames.length === 0 ? (
                            <div className="no-results">
                                <h2>Aucun jeu ne correspond aux filtres</h2>
                                <p>Modifiez vos filtres pour voir plus de résultats.</p>
                                <button className="reset-button" onClick={resetFilters}>
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        ) : (
                            renderGames()
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategorieView;
