import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import apiService from '../../services/apiService';
import './PlatformPage.scss';
import AevoriaLogo from '../../assets/images/Logo.png';

const PLATFORM_INFO = {
  steam: {
    name: 'Steam',
    logo: '/src/assets/svg/steam.svg',
    color: '#171a21',
    description: "Découvrez tous les jeux disponibles sur Steam. Plateforme incontournable du jeu PC, Steam propose des milliers de titres pour tous les goûts !",
  },
  epic: {
    name: 'Epic Games',
    logo: '/src/assets/svg/epic.svg',
    color: '#313131',
    description: "Retrouvez les meilleurs jeux Epic Games Store, la plateforme qui bouscule le marché avec ses exclusivités et ses jeux gratuits chaque semaine !",
  },
  playstation: {
    name: 'PlayStation',
    logo: '/src/assets/svg/playstation.svg',
    color: '#003087',
    description: "Les incontournables de la PlayStation, pour tous les fans de la console de Sony. Aventures, exclusivités et blockbusters au rendez-vous !",
  },
  xbox: {
    name: 'Xbox',
    logo: '/src/assets/svg/xbox.svg',
    color: '#107C10',
    description: "Découvrez la sélection Xbox : action, sport, aventure et bien plus, pour profiter au maximum de votre console Microsoft !",
  },
  nintendo: {
    name: 'Nintendo',
    logo: '/src/assets/svg/nintendo.svg',
    color: '#E60012',
    description: "L'univers Nintendo : fun, famille et exclusivités cultes. Redécouvrez Mario, Zelda, Pokémon et tous les classiques !",
  },
};

const PlatformPage = () => {
  const { platform } = useParams();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const info = PLATFORM_INFO[platform] || PLATFORM_INFO.steam;

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/games');
        const data = response?.$values || response;
        let filtered = [];
        switch (platform) {
          case 'steam':
            filtered = data.filter(g => g.isAvailableOnSteam);
            break;
          case 'epic':
            filtered = data.filter(g => g.isAvailableOnEpic);
            break;
          case 'playstation':
            filtered = data.filter(g => g.isAvailableOnPlayStation);
            break;
          case 'xbox':
            filtered = data.filter(g => g.isAvailableOnXbox);
            break;
          case 'nintendo':
            filtered = data.filter(g => g.isAvailableOnNintendo);
            break;
          default:
            filtered = data;
        }
        setGames(filtered);
      } catch (err) {
        setGames([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, [platform]);

  return (
    <div className="platform-page">
      <div className="platform-banner" style={{ background: info.color }}>
        <img src={info.logo} alt={info.name} className="platform-logo" />
        <div className="platform-banner-content">
          <h1>
            <img src={AevoriaLogo} alt="Aevoria" className="aevoria-logo" />
            {info.name}
          </h1>
          <p>{info.description}</p>
        </div>
        <img src={info.logo} alt="watermark" className="platform-watermark" />
      </div>
      <hr className="platform-separator" />
      <div className="platform-games-list">
        {isLoading ? (
          <div className="platform-loading">Chargement des jeux...</div>
        ) : games.length === 0 ? (
          <div className="platform-empty">Aucun jeu trouvé pour cette plateforme.</div>
        ) : (
          <div className="game-cards-container">
            {games.map((game) => (
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
                isXbox={game.isAvailableOnXbox}
                isNintendo={game.isAvailableOnNintendo}
                gameId={game.gameId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformPage;
