import React from 'react';
import Login from '../../components/Login/login';
import Button from '../../components/AEV/AEV.Button/Button';
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle';
import TabSwitcher from '../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import HomeSlider from './Slider/Slider';
import Categories from "./Categories/Categories";
import Promotions from "./Promotions/Promotions";

import './Home.scss';

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

const sliderData = [
  {
    image: "/assets/images/photo-test.webp",
    title: "EA SPORTS FC™ 24",
    genres: ["Sport", "Football", "Simulation"],
    price: 69.99,
    originalPrice: 79.99,
    tag: "Dernière Sortie",
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
  },
  {
    image: "/assets/images/photo-test.webp",
    title: "Red Dead Redemption",
    genres: ["Action", "Aventure", "Open World"],
    price: 49.99,
    originalPrice: 59.99,
    tag: "Dernière Sortie",
    isSteam: true,
    isEpic: false,
    isPlaystation: true,
  },
  {
    image: "/assets/images/photo-test.webp",
    title: "Resident Evil 4 Remake",
    genres: ["Horreur", "Action", "Survival"],
    price: 59.99,
    tag: "Dernière Sortie",
    isSteam: true,
    isEpic: true,
    isPlaystation: true,
  }
];

const Home = () => {
  return (
    <>
      <HomeSlider slides={sliderData} />

      <div className='container'>
        <p className="title-center">Une sélection infinie de jeux à portée de clic,
          pour chaque envie et chaque joueur.</p>
        <TabSwitcher tabs={tabs} />
      </div>

      <div className='container-fluid'>
        <SectionTitle text="Meilleure Vente" />
        <div className="game-cards-container">
          {Array.from({ length: 8 }).map((_, index) => (
            <GameCard key={index} {...sampleGame} />
          ))}
        </div>
        <div className="btn-container">
          <Button text="Voir plus" variant="solid" size="medium" onClick={() => alert("Solid Button Clicked")} />
        </div>
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
          <SectionTitle text="Promotions" />
          <Promotions />
        </div>
      </div>

    </>
  );
};

export default Home;
