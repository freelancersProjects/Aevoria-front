import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameHeroSection from './GameHeroSection/GameHeroSection'
import GameDescriptionSection from './GameDescriptionSection/GameDescriptionSection'
import GameMedia from './GameMedia/GameMedia'
import GameFeatures from './GameFeatures/GameFeatures'
import LiveStreamers from './LiveStreamers/LiveStreamers'
import GameCard from '../../components/AEV/AEV.GameCard/GameCard'
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle'
import GameCommentaire from './GameCommentaire/GameCommentaire'
import BlueCircle from '../../components/Visual/BlueCircle'
import apiService from '../../services/apiService'
import Skeleton from '../../components/AEV/AEV.Skeleton/Skeleton'
import './ViewGame.scss'

const similarGames = [
  {
    title: 'Kingdom come deliverance II',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp'
  },
  {
    title: 'The Witcher 3',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp'
  },
  {
    title: 'Minecraft',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp'
  }
];

const ViewGame = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;
    setLoading(true);
    apiService.get(`/games/${gameId}`)
      .then(data => {
        setGame(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors du chargement du jeu');
        setLoading(false);
      });
  }, [gameId]);

  if (loading) {
    return <Skeleton height={600} />;
  }
  if (error || !game) {
    return <div className="viewgame-container"><div className="error">{error || 'Aucune donnée'}</div></div>;
  }

  // Mapping des champs SQL vers les props attendues
  const heroProps = {
    image: game.banner_url || game.thumbnail_url,
    title: game.title,
    discount: game.discount || game.percentage_reduction,
    oldPrice: game.price ? (game.price / (1 - (game.discount || game.percentage_reduction || 0) / 100)).toFixed(2) : '',
    price: game.price,
    platforms: [
      game.is_available_on_pc && 'PC',
      game.is_available_on_playstation && 'PlayStation',
      game.is_available_on_xbox && 'Xbox',
      game.is_available_on_nintendo && 'Nintendo',
      game.is_available_on_steam && 'Steam',
      game.is_available_on_epic && 'Epic',
      game.is_available_on_gog && 'GOG',
    ].filter(Boolean),
    badges: [], // à compléter si besoin
    inStock: game.status === 'active' || game.status === 'Active',
  };

  const descriptionProps = {
    userCount: 0, // à remplacer si tu as l'info
    tags: [], // à compléter dynamiquement si tu as une API
    description: game.description,
    genres: [], // à compléter dynamiquement si tu as une API
    features: [], // à compléter dynamiquement si tu as une API
    developer: '', // à compléter dynamiquement si tu as une API
    publisher: game.publisher_id || '',
    releaseDate: game.release_date,
    platform: heroProps.platforms.join(', '),
    refundType: '', // à compléter si tu as l'info
    note: game.ratings,
    reviewCount: game.reviews_count,
  };

  const mediaProps = {
    slides: [
      game.banner_url ? { image: game.banner_url, title: game.title, thumbnail: game.thumbnail_url } : null,
      game.thumbnail_url ? { image: game.thumbnail_url, title: game.title, thumbnail: game.thumbnail_url } : null,
    ].filter(Boolean),
  };

  const featuresProps = {
    features: [], // à compléter dynamiquement si tu as une API
    requirements: {}, // à compléter dynamiquement si tu as une API
  };

  return (
    <div className="viewgame-container">
      <BlueCircle  top="400px" right="-500px" width="500px" height="500px" color="rgba(13, 110, 253, 0.6)" blur={160} />
      <BlueCircle  top="400px" left="-500px" width="600px" height="600px" color="rgba(13, 110, 253, 0.6)" blur={160} />

      <GameHeroSection {...heroProps} />
      <GameDescriptionSection {...descriptionProps} />
      <GameMedia {...mediaProps} />
      <GameFeatures {...featuresProps} />
      <BlueCircle  top="2400px" right="-600px" width="620px" height="597px" color="rgba(13, 110, 253, 0.6)" blur={160} />
      <LiveStreamers streamers={[]} chatMessages={[]} />
      <div className="promotions-section">
        <SectionTitle text="Produits similaires" />
        <div className="similar-products-grid">
          {similarGames.map((game, idx) => (
            <GameCard
              key={idx}
              title={game.title}
              genres={game.genres}
              price={game.price}
              discount={((game.oldPrice - game.price) / game.oldPrice * 100).toFixed(0)}
              isSteam={game.isSteam}
              isEpic={game.isEpic}
              isPlaystation={game.isPlaystation}
              image={game.image}
            />
          ))}
        </div>
        <GameCommentaire />
      </div>
    </div>
  )
}

export default ViewGame;
