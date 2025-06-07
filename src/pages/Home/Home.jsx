import React, { useState, useEffect } from 'react';
import Button from '../../components/AEV/AEV.Button/Button';
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle';
import TabFilters from '../../components/AEV/AEV.TabFilters/TabFilters';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import Slider from './Slider/Slider';
import Categories from "./Categories/Categories";
import Promotions from "./Promotions/Promotions";
import FirstSection from './FirstSection/FirstSection';
import './Home.scss';
import Banner from './Banner/Banner';

import apiService from '../../services/apiService';

const tabs = ["Tendance", "Meilleure Vente", "Précommande", "Promotion", "Carte cadeaux"];


const sampleGame = {
  // image: "https://via.placeholder.com/300x180",
  title: "Kingdom Come Deliverance II",
  genres: ["Action", "Aventure"],
  price: 59.99,
  discount: 20,
  isSteam: true,
  isEpic: true,
  isPlaystation: false,
};

const slideData = [
  {
    title: "LEGO Horizon Adventures",
    genres: ["Action", "Aventure"],
    price: 49.99,
    oldPrice: 59.99,
    discount: 20,
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
  },
  {
    title: "Cyberpunk 2077",
    genres: ["RPG", "Action"],
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    isSteam: true,
    isEpic: false,
    isPlaystation: true,
  },
  {
    title: "Assassins Creed Valhalla",
    genres: ["RPG", "Action"],
    price: 79.99,
    oldPrice: 99.99,
    discount: 33,
    isSteam: true,
    isEpic: false,
    isPlaystation: true,
  },
];

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiService.get('/games');
        const data = response?.$values || response;
        if (!Array.isArray(data)) throw new Error('Format des données incorrect');
        setGames(data);
      } catch (err) {
        setToast({ show: true, message: `Erreur : ${err.message}`, type: 'error' });
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <FirstSection />
      <Slider slides={slideData} />
      <div className='container'>
        <p className="title-center mt-3">Une sélection infinie de jeux à portée de clic,
          pour chaque envie et chaque joueur.</p>
        <TabFilters tabs={tabs} />
      </div>

      <div className='container-fluid'>
        <SectionTitle text="Meilleure Vente" url="test" />
        <div className="game-cards-container">
          {games.map((game) => (
            <GameCard
            key={game.gameId}
            image={game.thumbnailUrl}
            title={game.title}
            // genres={game.genreId}
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
        <div className="btn-container">
          <Button text="Voir plus" variant="solid" size="medium" onClick={() => alert("Solid Button Clicked")} />
        </div>
      </div>
      <div className='container-fluid'>
        <Banner />
      </div>
      <div className='container-fluid'>
        <SectionTitle text="Par Categories" />
        <Categories />
        <div className="btn-container">
          <Button text="Voir plus" variant="solid" size="medium" onClick={() => alert("Solid Button Clicked")} />
        </div>
      </div>
      <div className='container-promo'>
        <div className='container container-promo-text'>
          <p className="title-center text-up-promo">
            Des promotions exceptionnelles sur une sélection de jeux
          </p>
          <p className="title-center text-down-promo">
            Découvrez vos futurs favoris à prix réduit
          </p>

          <p className="text-light text-to-date font-montserrat">Jusqu'au <span className="blue text-bold">25 Janvier 2003</span></p>
        </div>

        <div className='container-fluid'>
          <Promotions />
        </div>
      </div>
    </>
  );
};

export default Home;
