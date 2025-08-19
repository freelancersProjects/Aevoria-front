import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from '../../components/AEV/AEV.Skeleton/Skeleton';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import GameFilters from '../../components/GameFilters/GameFilters';
import './SearchPage.scss';
import apiService from '../../services/apiService';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'Les plus pertinents');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || 'Toutes les plateformes');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'Tous les genres');
  const [selectedAvailability, setSelectedAvailability] = useState(searchParams.get('availability') || 'Tout');
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice')) || 0,
    parseInt(searchParams.get('maxPrice')) || 200,
  ]);
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('sort', selectedSort);
    params.set('platform', selectedPlatform);
    params.set('genre', selectedGenre);
    params.set('availability', selectedAvailability);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    params.set('inStock', inStock.toString());

    if (!params.has('q')) {
      params.set('q', '');
    }

    navigate(`/search?${params.toString()}`, { replace: true });

    // let count = 0;
    // if (selectedSort !== 'Les plus pertinents') count++;
    // if (selectedPlatform !== 'Toutes les plateformes') count++;
    // if (selectedGenre !== 'Tous les genres') count++;
    // if (selectedAvailability !== 'Tout') count++;
    // if (priceRange[0] > 0 || priceRange[1] < 200) count++;
    // if (inStock) count++;
  }, [selectedSort, selectedPlatform, selectedGenre, selectedAvailability, priceRange, inStock]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await apiService.get('/games');
        const allGames = response?.$values || [];
        if (searchQuery.trim()) {
          const filteredGames = allGames.filter(game =>
            game.title.toLowerCase().includes(searchQuery.toLowerCase()),
          );
          setGames(filteredGames);
        } else {
          setGames(allGames);
        }
      } catch {
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchQuery]);

  useEffect(() => {
    let filtered = [...games];

    if (selectedPlatform !== 'Toutes les plateformes') {
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

    if (selectedGenre !== 'Tous les genres') {
      filtered = filtered.filter(game => game.genres?.includes(selectedGenre));
    }

    if (selectedAvailability !== 'Tout') {
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
      case 'Prix croissant':
        return priceA - priceB;
      case 'Prix décroissant':
        return priceB - priceA;
      case 'Date de sortie':
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case 'Alphabétique':
        return a.title.localeCompare(b.title);
      case 'Meilleures notes':
        return (b.rating || 0) - (a.rating || 0);
      case 'Plus populaires':
        return (b.popularity || 0) - (a.popularity || 0);
      default:
        return 0;
      }
    });

    setFilteredGames(filtered);
  }, [games, selectedPlatform, selectedGenre, selectedAvailability, priceRange, selectedSort, inStock]);

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
        percentage_reduction={game.percentageReduction}
        isSteam={game.isAvailableOnSteam}
        isEpic={game.isAvailableOnEpic}
        isPlaystation={game.isAvailableOnPlayStation}
        gameId={game.gameId}
      />
    ));
  };

  const resetFilters = () => {
    setSelectedSort('Les plus pertinents');
    setSelectedPlatform('Toutes les plateformes');
    setSelectedGenre('Tous les genres');
    setSelectedAvailability('Tout');
    setPriceRange([0, 200]);
    setInStock(false);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <div className="search-info">
            <h1>
              {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les jeux'}
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
          {loading ? renderSkeletons() : (
            filteredGames.length === 0 ? (
              <div className="no-results">
                <h2>{searchQuery ? `Aucun résultat trouvé pour "${searchQuery}"` : 'Aucun jeu ne correspond aux filtres'}</h2>
                <p>Essayez avec d'autres mots-clés ou modifiez vos filtres.</p>
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
};

export default SearchPage;
