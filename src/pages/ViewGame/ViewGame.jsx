import GameHeroSection from './GameHeroSection/GameHeroSection';
import GameDescriptionSection from './GameDescriptionSection/GameDescriptionSection';
import GameMedia from './GameMedia/GameMedia';
import GameFeatures from './GameFeatures/GameFeatures';
import LiveStreamers from './LiveStreamers/LiveStreamers';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle';
import GameCommentaire from './GameCommentaire/GameCommentaire';
import BlueCircle from '../../components/Visual/BlueCircle';
import './ViewGame.scss';

const games = [
  {
    title: 'Kingdom come deliverance II',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp',
  },
  {
    title: 'The Witcher 3',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp',
  },
  {
    title: 'Minecraft',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp',
  },
  {
    title: 'Kingdom come deliverance II',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp',
  },
  {
    title: 'The Witcher 3',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp',
  },
  {
    title: 'Minecraft',
    genres: ['Action', 'Aventure'],
    price: 49.99,
    oldPrice: 59.99,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
    image: '/src/assets/images/photo-test.webp',
  },
];

const ViewGame = () => {
  return (
    <div className="viewgame-container">
      <BlueCircle  top="400px" right="-500px" width="500px" height="500px" color="rgba(13, 110, 253, 0.6)" blur={160} />
      <BlueCircle  top="400px" left="-500px" width="600px" height="600px" color="rgba(13, 110, 253, 0.6)" blur={160} />

      <GameHeroSection />
      <GameDescriptionSection />
      <GameMedia />
      <GameFeatures />
      <BlueCircle  top="2400px" right="-600px" width="620px" height="597px" color="rgba(13, 110, 253, 0.6)" blur={160} />
      <LiveStreamers />
      <div className="promotions-section-view">
        <SectionTitle text="Produits similaires" />
        <div className="similar-products-grid">
          {games.map((game, idx) => (
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
  );
};

export default ViewGame;
