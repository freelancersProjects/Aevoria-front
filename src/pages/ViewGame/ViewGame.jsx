import React from 'react'
import GameHeroSection from './GameHeroSection/GameHeroSection'
import GameDescriptionSection from './GameDescriptionSection/GameDescriptionSection'
import GameMedia from './GameMedia/GameMedia'
import GameFeatures from './GameFeatures/GameFeatures'
import './ViewGame.scss'

const ViewGame = () => {
  return (
    <div className="viewgame-container">
      <GameHeroSection />
      <GameDescriptionSection />
      <GameMedia />
      <GameFeatures />
    </div>
  )
}

export default ViewGame;
