import React from 'react';
import './GameDescriptionSection.scss';
import { FaUser, FaStar, FaShareAlt, FaFlag } from 'react-icons/fa';
import TooltipChips from '../../../components/AEV//AEV.TooltipChips/TooltipChips';
import LogoVueJeu from '../../../assets/svg/logo-vue-jeu.svg';

const GameDescriptionSection = ({
  userCount,
  tags = [],
  description,
  genres = [],
  features = [],
  developer,
  publisher,
  releaseDate,
  platform,
  refundType,
  note,
  reviewCount
}) => {
  return (
    <section className="game-wrapper">
      <div className="game-description">
        <div className="left-content">
          <div className="user-count">
            <img src={LogoVueJeu} alt="User icon" /> <span>{userCount ? `${userCount} utilisateurs sur cette page` : 'Aucun utilisateur en ligne'}</span>
          </div>

          <div className="tags">
            {tags.length > 0 ? tags.map((tag, i) => (
              <TooltipChips key={i} label={tag.name} tooltipText={tag.description || ''} />
            )) : <TooltipChips label="Aucun tag" />}
          </div>

          <h2>Description</h2>
          <p className="description-text">
            {description || 'Aucune description disponible pour ce jeu.'}
          </p>
          <a href="#" className="see-more">Voir plus</a>

          <div className="info-columns">
            <div>
              <h4>Genres:</h4>
              {genres.length > 0 ? genres.map((g, i) => <TooltipChips key={i} label={g.name || g} />) : <TooltipChips label="Aucun genre" />}
            </div>
            <div>
              <h4>Features:</h4>
              <div className="pills">
                {features.length > 0 ? features.map((f, i) => <span key={i}>{f}</span>) : <span>Aucune feature</span>}
              </div>
            </div>
          </div>
        </div>

        <aside className="right-content">
          <ul className="game-meta">
            <li><span>Developer</span><strong>{developer || 'Inconnu'}</strong></li>
            <li><span>Publisher</span><strong>{publisher || 'Inconnu'}</strong></li>
            <li><span>Release Date</span><strong>{releaseDate || 'Non renseignée'}</strong></li>
            <li><span>Platform</span><strong>{platform || 'Non renseignée'}</strong></li>
            <li><span>Refund Type</span><strong>{refundType || 'Non renseigné'}</strong></li>
          </ul>

          <div className="action-buttons">
            <button className="share"><FaShareAlt /> Share</button>
            <button className="report"><FaFlag /> Report</button>
          </div>
        </aside>
      </div>

      <div className="bottom-note">
        <div className="score">
          <span className="circle">{note || '-'}</span>
          <div>
            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> {reviewCount ? `${reviewCount} avis` : 'Aucun avis'}</div>
          </div>
        </div>
        <div className="note-detail">
          <strong>Note du jeu</strong>
          <p>{reviewCount ? `basé sur ${reviewCount} tests, toutes langues confondues` : 'Aucun test pour ce jeu.'}</p>
        </div>
        <button className="write-review">✏️ Rédiger votre test sur ce jeu</button>
      </div>
    </section>
  );
};

export default GameDescriptionSection;
