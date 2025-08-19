import { useState, useEffect } from 'react';
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import Slider from './Slider/Slider';
import Categories from './Categories/Categories';
import Promotions from './Promotions/Promotions';
import FirstSection from './FirstSection/FirstSection';
import './Home.scss';
import Banner from './Banner/Banner';
import apiService from '../../services/apiService';
import Skeleton from '../../components/AEV/AEV.Skeleton/Skeleton';

// Composant custom pour le bouton "Voir plus" (traits latéraux sur toute la largeur)
const VoirPlusCustom = ({ onClick }) => (
  <div className="voir-plus-custom voir-plus-hr" onClick={onClick}>
    <span className="plus">+</span>
    <span className="line line-left"></span>
    <span className="line line-right"></span>
  </div>
);

const PAGE_SIZE = 20;

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allGamesPage, setAllGamesPage] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/games');
        const data = response?.$values || response;
        if (!Array.isArray(data)) throw new Error('Format des données incorrect');
        setGames(data);
      } catch {
        // Optionnel : toast d'erreur
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Helpers pour les dates
  const today = new Date();
  const parseDate = (d) => d ? new Date(d) : new Date(0);

  // Filtres dynamiques
  const newReleases = [...games]
    .filter(g => g.releaseDate)
    .sort((a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate))
    .slice(0, 8);

  const preorders = games.filter(g => parseDate(g.releaseDate) > today).slice(0, 8);

  const bestSellers = [...games]
    .filter(g => g.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 8);

  const promotions = games.filter(g => g.discount > 0).slice(0, 8);

  // Pagination pour tous les jeux
  const allGamesToShow = games.slice(0, allGamesPage * PAGE_SIZE);
  const hasMoreGames = allGamesToShow.length < games.length;

  const handleVoirPlus = () => {
    setAllGamesPage((prev) => prev + 1);
  };

  return (
    <>
      <FirstSection />
      <Slider slides={[]} />
      <div className='container'>
        <p className="title-center mt-3">Une sélection infinie de jeux à portée de clic,
          pour chaque envie et chaque joueur.</p>
      </div>

      {bestSellers.length > 0 && (
        <div className='container-fluid'>
          <SectionTitle text="Meilleures ventes" />
          <div className="game-cards-container">
            {isLoading ? <Skeleton count={8} /> : bestSellers.map((game) => (
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
            ))}
          </div>
        </div>
      )}

      {newReleases.length > 0 && (
        <div className='container-fluid'>
          <SectionTitle text="Nouveautés" />
          <div className="game-cards-container">
            {isLoading ? <Skeleton count={8} /> : newReleases.map((game) => (
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
            ))}
          </div>
        </div>
      )}

      {preorders.length > 0 && (
        <div className='container-fluid'>
          <SectionTitle text="Précommandes" />
          <div className="game-cards-container">
            {isLoading ? <Skeleton count={8} /> : preorders.map((game) => (
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
            ))}
          </div>
        </div>
      )}

      {promotions.length > 0 && (
        <div className='container-fluid'>
          <SectionTitle text="Promotions" />
          <div className="game-cards-container">
            {isLoading ? <Skeleton count={8} /> : promotions.map((game) => (
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
            ))}
          </div>
        </div>
      )}

      <div className='container-fluid'>
        <SectionTitle text="Tous les jeux" />
        <div className="game-cards-container">
          {isLoading ? <Skeleton count={20} /> : allGamesToShow.map((game) => (
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
          ))}
        </div>
        {!isLoading && hasMoreGames && (
          <div className="btn-container">
            <VoirPlusCustom onClick={handleVoirPlus} />
          </div>
        )}
      </div>

      <div className='container-fluid'>
        <Banner />
      </div>
      <div className='container-fluid'>
        <SectionTitle text="Par Categories" />
        <Categories />
      </div>
      <div className='container-promo'>
        <div className='container container-promo-text'>
          <p className="title-center text-up-promo mb-2">
              Profitez de promotions exclusives sur une sélection de jeux incontournables.
          </p>

          <p className="text-light text-to-date font-montserrat mb-1 mt-2">Jusqu'au <span className="blue text-bold">25 Janvier 2003</span></p>
        </div>

        <div className='container-fluid'>
          <Promotions />
        </div>
      </div>
    </>
  );
};

export default Home;
