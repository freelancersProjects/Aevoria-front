import React, { useMemo } from 'react'
import GameHeroSection from './GameHeroSection/GameHeroSection'
import GameDescriptionSection from './GameDescriptionSection/GameDescriptionSection'
import GameMedia from './GameMedia/GameMedia'
import GameFeatures from './GameFeatures/GameFeatures'
import LiveStreamers from './LiveStreamers/LiveStreamers'
import GameCard from '../../components/AEV/AEV.GameCard/GameCard'
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle'
import GameCommentaire from './GameCommentaire/GameCommentaire'
import BlueCircle from '../../components/Visual/BlueCircle'
import './ViewGame.scss'

// MOCK DATA (à remplacer par hook/API)
const gameData = {
  image: '/src/assets/images/photo-test.webp',
  title: 'Valorant',
  discount: 18,
  oldPrice: 54,
  price: 44.45,
  platforms: ['Xbox Series X/S', 'PC', 'PlayStation 5'],
  badges: [
    { icon: <span role="img" aria-label="store">🛒</span>, text: 'Microsoft Store' },
    { icon: <span role="img" aria-label="stock">✅</span>, text: 'En stock' },
    { icon: <span role="img" aria-label="download">⬇️</span>, text: 'Téléchargement digital' }
  ],
  inStock: true,
  userCount: 149,
  tags: [
    { name: 'Compatible Steam Deck', description: 'Ce jeu fonctionne sur Steam Deck' },
    { name: 'Protagoniste féminine', description: 'Le personnage principal est une femme' },
    { name: 'Écran partagé', description: 'Jouez à plusieurs sur le même écran' },
    { name: 'Coop', description: 'Mode coopération disponible' }
  ],
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...',
  genres: [ { name: 'Action' }, { name: 'Adventure' } ],
  features: ['Single Player', 'Coopération en ligne'],
  developer: 'Banana Gamers LLC',
  publisher: 'Blue Ocean Publishing',
  releaseDate: '06/08/25',
  platform: 'Xbox',
  refundType: 'Save 5% Back',
  note: 10,
  reviewCount: 3,
  media: [
    { image: 'https://picsum.photos/seed/cyber1/1200/675', title: 'Neon Warfare', thumbnail: 'https://picsum.photos/seed/cyber1/300/169' },
    { image: 'https://picsum.photos/seed/cyber2/1200/675', title: 'Digital Combat', thumbnail: 'https://picsum.photos/seed/cyber2/300/169' },
    { image: 'https://picsum.photos/seed/cyber3/1200/675', title: 'Future City', thumbnail: 'https://picsum.photos/seed/cyber3/300/169' },
    { image: 'https://picsum.photos/seed/cyber4/1200/675', title: 'Cyber Arena', thumbnail: 'https://picsum.photos/seed/cyber4/300/169' },
    { image: 'https://picsum.photos/seed/cyber5/1200/675', title: 'Neon Streets', thumbnail: 'https://picsum.photos/seed/cyber5/300/169' }
  ],
  requirements: {
    platforms: [
      {
        name: 'Windows',
        items: [
          { label: 'OS', value: 'Win 10 64 Bit' },
          { label: 'Processor', value: 'Intel i5-4690 / Intel i3-10100 / AMD Ryzen 5 1200' },
          { label: 'Memory', value: '8 GB RAM' },
          { label: 'Graphics', value: 'NVIDIA GTX 1050 / AMD RX 460 / Intel Arc A380' },
          { label: 'DirectX', value: 'Version 12' },
          { label: 'Storage', value: '20 GB available space' }
        ]
      },
      {
        name: 'Mac',
        items: [
          { label: 'OS', value: 'Sequoia' },
          { label: 'Processor', value: 'M1 8 Core' },
          { label: 'Memory', value: '8 GB RAM' },
          { label: 'Graphics', value: 'M1' },
          { label: 'Storage', value: '25 GB available space' }
        ]
      }
    ]
  },
  streamers: [
    {
      id: 1,
      username: 'Gaming_303',
      avatar: 'https://picsum.photos/seed/streamer1/50/50',
      thumbnail: 'https://picsum.photos/seed/stream1/400/225',
      viewers: '2.5K',
      platform: 'twitch',
      isLive: true,
      title: 'Epic Battle Royale - Road to Victory!',
      game: 'Valorant',
      duration: '2h 15m'
    },
    {
      id: 2,
      username: 'ProGamer_XZ',
      avatar: 'https://picsum.photos/seed/streamer2/50/50',
      thumbnail: 'https://picsum.photos/seed/stream2/400/225',
      viewers: '1.8K',
      platform: 'youtube',
      isLive: true,
      title: 'Ranked Climbing Stream',
      game: 'Valorant',
      duration: '45m'
    }
  ],
  chatMessages: [
    { user: 'CyberFan123', text: 'Amazing gameplay! 🔥' },
    { user: 'GameMaster', text: 'Nice shot!' },
    { user: 'NeonGamer', text: "What's your setup?" }
  ]
};

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
  // Ici tu peux remplacer par un hook de récupération API
  const data = useMemo(() => gameData, []);

  return (
    <div className="viewgame-container">
      <BlueCircle  top="400px" right="-500px" width="500px" height="500px" color="rgba(13, 110, 253, 0.6)" blur={160} />
      <BlueCircle  top="400px" left="-500px" width="600px" height="600px" color="rgba(13, 110, 253, 0.6)" blur={160} />

      <GameHeroSection
        image={data.image}
        title={data.title}
        discount={data.discount}
        oldPrice={data.oldPrice}
        price={data.price}
        platforms={data.platforms}
        badges={data.badges}
        inStock={data.inStock}
      />
      <GameDescriptionSection
        userCount={data.userCount}
        tags={data.tags}
        description={data.description}
        genres={data.genres}
        features={data.features}
        developer={data.developer}
        publisher={data.publisher}
        releaseDate={data.releaseDate}
        platform={data.platform}
        refundType={data.refundType}
        note={data.note}
        reviewCount={data.reviewCount}
      />
      <GameMedia slides={data.media} />
      <GameFeatures features={data.features} requirements={data.requirements} />
      <BlueCircle  top="2400px" right="-600px" width="620px" height="597px" color="rgba(13, 110, 253, 0.6)" blur={160} />
      <LiveStreamers streamers={data.streamers} chatMessages={data.chatMessages} />
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
