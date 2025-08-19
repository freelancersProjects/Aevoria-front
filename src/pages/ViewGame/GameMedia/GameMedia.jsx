import { useState } from 'react';
import './GameMedia.scss';
import SliderSelector from '../../../components/AEV/AEV.SliderSelector/SliderSelector';
import PauseIcon from '../../../assets/svg/Pause.svg';
import PlayIcon from '../../../assets/svg/PlayIcon.svg';

const slides = [
  {
    image: 'https://picsum.photos/seed/cyber1/1200/675',
    title: 'Neon Warfare',
    thumbnail: 'https://picsum.photos/seed/cyber1/300/169',
  },
  {
    image: 'https://picsum.photos/seed/cyber2/1200/675',
    title: 'Digital Combat',
    thumbnail: 'https://picsum.photos/seed/cyber2/300/169',
  },
  {
    image: 'https://picsum.photos/seed/cyber3/1200/675',
    title: 'Future City',
    thumbnail: 'https://picsum.photos/seed/cyber3/300/169',
  },
  {
    image: 'https://picsum.photos/seed/cyber4/1200/675',
    title: 'Cyber Arena',
    thumbnail: 'https://picsum.photos/seed/cyber4/300/169',
  },
  {
    image: 'https://picsum.photos/seed/cyber5/1200/675',
    title: 'Neon Streets',
    thumbnail: 'https://picsum.photos/seed/cyber5/300/169',
  },
];

const GameMedia = () => {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="game-media">
      <div className="game-wrapper">
        {/* Main video player */}
        <div className="video-player">
          <div className="video-container">
            <img src={selectedSlide.image} alt={selectedSlide.title} />

            {/* Video controls overlay */}
            <div className="video-overlay">
              <div className="play-button" onClick={togglePlay}>
                {isPlaying ? (
                  <img src={PauseIcon} alt="Pause" />
                ) : (
                  <img src={PlayIcon} alt="Play" />
                )}
              </div>
            </div>

            {/* Video progress bar */}
            <div className="video-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>

            {/* Video info */}
            <div className="video-info">
              <span className="video-time">05:02</span>
            </div>

            {/* Video controls */}
            <div className="video-controls">
              <div className="controls-left">
                <button className="control-btn play-btn" onClick={togglePlay}>
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <span className="video-title">{selectedSlide.title}</span>
              </div>
              <div className="controls-right">
                <button className="control-btn">🔊</button>
                <button className="control-btn">⚙️</button>
                <button className="control-btn">📺</button>
                <button className="control-btn">⛶</button>
              </div>
            </div>
          </div>
        </div>

        {/* SliderSelector navigation */}
        <div className="slider-selector-nav" style={{ marginTop: 32 }}>
          <SliderSelector
            slides={slides}
            clickable={true}
            showMultiple={4}
            onSlideClick={handleSlideClick}
            selectedSlide={selectedSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default GameMedia;
