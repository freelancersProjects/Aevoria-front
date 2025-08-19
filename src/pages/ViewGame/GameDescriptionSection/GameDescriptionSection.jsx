import './GameDescriptionSection.scss';
import { FaStar, FaShareAlt, FaFlag } from 'react-icons/fa';
import TooltipChips from '../../../components/AEV//AEV.TooltipChips/TooltipChips';
import LogoVueJeu from '../../../assets/svg/logo-vue-jeu.svg';

const GameDescriptionSection = () => {
  return (
    <section className="game-wrapper">
      <div className="game-description">
        <div className="left-content">
          <div className="user-count">
            <img src={LogoVueJeu} alt="User icon" /> <span>149 utilisateurs sur cette page</span>
          </div>

          <div className="tags">
            <TooltipChips label="Compatible Steam Deck" tooltipText="Ce jeu fonctionne sur Steam Deck" />
            <TooltipChips label="Protagoniste féminine" tooltipText="Le personnage principal est une femme" />
            <TooltipChips label="Écran partagé" tooltipText="Jouez à plusieurs sur le même écran" />
            <TooltipChips label="Coop" tooltipText="Mode coopération disponible" />
          </div>

          <h2>Description</h2>
          <p className="description-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum...
          </p>
          <a href="#" className="see-more">Voir plus</a>

          <div className="info-columns">
            <div>
              <h4>Genres:</h4>
              <TooltipChips label="Action" />
              <TooltipChips label="Adventure" />
            </div>
            <div>
              <h4>Features:</h4>
              <div className="pills">
                <span>Single Player</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="right-content">
          <ul className="game-meta">
            <li><span>Refer a Friend</span><a href="#">share it to earn money!</a></li>
            <li><span>Developer</span><strong>Banana Gamers LLC</strong></li>
            <li><span>Publisher</span><strong>Blue Ocean Publishing</strong></li>
            <li><span>Release Date</span><strong>06/08/25</strong></li>
            <li><span>Platform</span><strong>Xbox</strong></li>
            <li><span>Refund Type</span><strong>Save 5% Back</strong></li>
            <li><span>See All Editions and Add-Ons</span></li>
          </ul>

          <div className="action-buttons">
            <button className="share"><FaShareAlt /> Share</button>
            <button className="report"><FaFlag /> Report</button>
          </div>
        </aside>
      </div>

      <div className="bottom-note">
        <div className="score">
          <span className="circle">10</span>
          <div>
            <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> Verified Customers</div>
          </div>
        </div>
        <div className="note-detail">
          <strong>Note du jeu</strong>
          <p>basé sur 3 tests, toutes langues confondues</p>
        </div>
        <button className="write-review">✏️ Rédiger votre test sur ce jeu</button>
      </div>
    </section>
  );
};

export default GameDescriptionSection;
