import React from 'react';
import Button from '../../components/AEV/AEV.Button/Button';
import SectionTitle from '../../components/AEV/AEV.SectionTitle/SectionTitle';
import TabSwitcher from '../../components/AEV/AEV.TabSwitcher/TabSwitcher';
import GameCard from '../../components/AEV/AEV.GameCard/GameCard';

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
const Home = () => {
  return (
    <>
      <div className='container'>
          <TabSwitcher tabs={tabs} />
      </div>

    <div className='container-fluid'>
      <SectionTitle text="Meilleure Vente" />

     <div className="row">
      {Array.from({ length: 8 }).map((_, index) => (
        <GameCard key={index} {...sampleGame} />
      ))}
      </div>
        <Button text="Voir plus" variant="solid" size="medium" onClick={() => alert("Solid Button Clicked")} />


    </div>
    </>
  );
};

export default Home;
