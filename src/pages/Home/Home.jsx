import React from 'react';
import Login from '../../components/Login/login';
import Button from '../../components/AEV/AEV.Button/Button';
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle';
import TabSwitcher from '../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';
import HomeSlider from './Slider/Slider';
import Categories from "./Categories/Categories";
import Promotions from "./Promotions/Promotions";

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
        <Button text="Voir plus" variant="solid" size="medium" onClick={() => alert("Solid Button Clicked")} />
      </div>

      <div className='container-fluid'>
        <SectionTitle text="Par Categories" />
      <Categories />
      <Button text="Voir plus" variant="solid" size="medium" onClick={() => alert("Solid Button Clicked")} />
      </div>

      <div className='container'>
        <p className="title-center">
          Des promotions exceptionnelles sur une sélection de jeux
          <br />
          Découvrez vos futurs favoris à prix réduit
        </p>
        <span>Jusqu'au 25 Janvier 2003</span>
      </div>

      <div className='container-fluid'>
        <SectionTitle text="Les offres du moment" />
        <Promotions />
      </div>

    </>
  );
};

export default Home;
